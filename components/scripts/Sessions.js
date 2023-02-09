import Session from './Session.js';

export default class Sessions {
  constructor(data, all_speakers) {
    this.data = data;
    // map the sessions array to a new array of Session objects
    this.sessions = data.sessions.map((x) => new Session(x, all_speakers));
    this.start_times = new Set(data.sessions.map((x) => x.startsAt));
    this.end_times = new Set(data.sessions.map((x) => x.endsAt));
    this.rooms = new Set(data.sessions.map((x) => x.room));
    this.all_speakers = all_speakers;
  }
}
