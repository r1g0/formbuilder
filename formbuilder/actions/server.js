import KintoClient from "kinto-client";
import btoa from "btoa";
import uuid from "uuid";
import S from "string";

import {addNotification} from "./notifications";
import {getUserToken} from "../utils";
import config from "../config";


export const FORM_PUBLISH = "FORM_PUBLISH";

export const FORM_PUBLICATION_PENDING = "FORM_PUBLICATION_PENDING";
export const FORM_PUBLICATION_DONE = "FORM_PUBLICATION_DONE";
export const FORM_PUBLICATION_FAILED = "FORM_PUBLICATION_FAILED";

export const FORM_RECORD_CREATION_PENDING = "FORM_RECORD_CREATION_PENDING";
export const FORM_RECORD_CREATION_DONE = "FORM_RECORD_CREATION_DONE";

export const SCHEMA_RETRIEVAL_PENDING = "SCHEMA_RETRIEVAL_PENDING";
export const SCHEMA_RETRIEVAL_DONE = "SCHEMA_RETRIEVAL_DONE";

export const RECORDS_RETRIEVAL_PENDING = "RECORDS_RETRIEVAL_PENDING";
export const RECORDS_RETRIEVAL_DONE = "RECORDS_RETRIEVAL_DONE";

const CONNECTIVITY_ISSUES = "This is usually due to an unresponsive server or some connectivity issues.";

const defaultRequest = {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
  credentials: 'same-origin'
};


function connectivityIssues(dispatch, message) {
  const msg = message +  " " + CONNECTIVITY_ISSUES;
  dispatch(addNotification(msg, {type: "error"}));
}

/**
 * Return HTTP authentication headers from a given token.
 **/
function getAuthenticationHeaders(token) {
  return {Authorization: "Basic " + btoa(`form:${token}`)};
}

/**
 * Initializes the bucket used to store all the forms and answers.
 *
 * - All authenticated users can create new collections
 * - The credentials used to create this bucket aren't useful anymore after
 *   this function as the user is removed from the permissions.
 **/
function initializeBucket() {
  const api = new KintoClient(
    config.server.remote,
    {headers: getAuthenticationHeaders(uuid.v4())}
  );
  return api.createBucket(config.server.bucket, {
    safe: true,
    permissions: {
      "collection:create": ["system.Authenticated",]
    }
  }).then(() => {
    api.bucket(config.server.bucket).setPermissions({
      "write": []
    },
    {patch: true}); // Do a PATCH request to prevent everyone to be an admin.
  })
  .catch(() => {
    console.debug("Skipping bucket creation, it probably already exist.");
  });
}

function slugify(string) {
  return S(string).slugify().replace("-", "_").s;
}

// {
//   "id":143,
//   "text": "Escanear QR CODE",
//   "type": "qr",
//   "required": false
// }
function formatForStartrack(schema, uiSchema, STSchema){
  return uiSchema["ui:order"].map(
    questionId => {
      const STQuestion = STSchema[questionId];
      const kintoQ = schema.properties[questionId];
      let questionSchema = {
        id: STQuestion.id,
        text: kintoQ.title,
        type: STQuestion.type,
        required: schema.required.indexOf(questionId)>=0
      }
      if (kintoQ.enum){
        questionSchema.options = kintoQ.enum.map(
          (display, index) => {
            return {
              index: `${index}`,
              display: display,
              value: slugify(display)
            }
          }
        )
      }else if (kintoQ.validation){
        questionSchema.validation = {
          max_error: kintoQ.validation.max_error,
        };
        if (kintoQ.validation.areas && kintoQ.validation.areas.length>0) {
          questionSchema.validation.areas = kintoQ.validation.areas;
        }
      }
      return questionSchema;
    }
  );
}

/**
 * Publishes a new form and give the credentials to the callback function
 * when it's done.
 *
 * In case a 403 is retrieved, initialisation of the bucket is triggered.
 **/

export function publishForm(callback) {
  const thunk =  (dispatch, getState, retry = true) => {

    const form = getState().form;
    const schema = form.schema;
    const uiSchema = form.uiSchema;
    const startrack = form.startrack;

    const resultJSON = formatForStartrack(schema, uiSchema, startrack);
    console.log("I would send the server this ", resultJSON);
    const body = {
      name: schema.title,
      notes: schema.description,
      json: JSON.stringify(resultJSON),
      place_question_id: null,
      place_name_template: null,
      place_min_radius: null,
      place_group_id: 1
    }

    var bodyEncoded = Object.keys(body).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(body[k])
    }).join('&');

    fetch('/ajax/surveys.php?cmd=create', {
      ...defaultRequest,
      body: bodyEncoded
    })
    .then(response => response.json())
    .then((res) => (err, res) => {
        // Calling the end function will send the request
      });
  };
  return thunk;
}

/**
 * Submit a new form answer.
 * New credentials are created for each answer.
 **/
export function submitRecord(record, collection, callback) {
  return (dispatch, getState) => {
    dispatch({type: FORM_RECORD_CREATION_PENDING});

    // Submit all form answers under a different users.
    // Later-on, we could persist these userid to let users change their
    // answers (but we're not quite there yet).
    new KintoClient(config.server.remote, {
      headers: getAuthenticationHeaders(uuid.v4())
    })
    .bucket(config.server.bucket)
    .collection(collection)
    .createRecord(record).then(({data}) => {
      dispatch({type: FORM_RECORD_CREATION_DONE});
      if (callback) {
        callback();
      }
    })
    .catch((error) => {
      connectivityIssues(dispatch, "We were unable to publish your answers");
    });
  };
}

export function loadSchema(collection, callback) {
  return (dispatch, getState) => {
    dispatch({type: SCHEMA_RETRIEVAL_PENDING});
    new KintoClient(config.server.remote, {
      headers: getAuthenticationHeaders(collection)
    })
    .bucket(config.server.bucket)
    .collection(collection)
    .getData().then((data) => {
      dispatch({
        type: SCHEMA_RETRIEVAL_DONE,
        data,
      });
      if (callback) {
        callback(data);
      }
    })
    .catch((error) => {
      connectivityIssues(dispatch, "We were unable to load your form");
    });
  };
}

/**
 * Retrieve all the answers to a specific form.
 *
 * The userToken is derived from the the adminToken.
 **/
export function getRecords(adminToken, callback) {
  return (dispatch, getState) => {
    const collection = getUserToken(adminToken);
    dispatch({type: RECORDS_RETRIEVAL_PENDING});
    new KintoClient(config.server.remote, {
      headers: getAuthenticationHeaders(adminToken)
    })
    .bucket(config.server.bucket)
    .collection(collection)
    .listRecords().then(({data}) => {
      dispatch({
        type: RECORDS_RETRIEVAL_DONE,
        records: data
      });
      if (callback) {
        callback(data);
      }
    })
    .catch((error) => {
      connectivityIssues(
        dispatch,
        "We were unable to retrieve the list of records for your form."
      );
    });
  };
}
