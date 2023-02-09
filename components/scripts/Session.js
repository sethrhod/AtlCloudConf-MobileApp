export default class Session {
  constructor(session, all_speakers) {
    this.id = session.id;
    this.title = session.title;
    this.description = session.description;
    this.startsAt = session.startsAt;
    this.endsAt = session.endsAt;
    this.room = session.room;
    this.speakers_small_object = session.speakers;
    this.speakers = this.getSpeakers();
    this.all_speakers = all_speakers;
  }
  // a method that find the matching speaker id in the all_speakers array and the speakers_small_object array and returns the corresponding speaker object from the all_speakers array
  getSpeakers() {
    var speakers = [];
    this.speakers_small_object.forEach((speaker) => {
      var matching_speaker = this.all_speakers.find((x) => x.id === speaker.id);
      speakers.push(matching_speaker);
    });
    return speakers;
  }
}
