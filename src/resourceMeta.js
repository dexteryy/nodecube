
import uuid from 'uuid/v4';
import moment from 'moment';

export default function resourceMeta(json) {
  if (json.id) {
    json.updatedAt = moment.utc();
  } else {
    json.id = uuid();
    json.createdAt = moment.utc();
  }
  return json;
}
