export default class Music {
  constructor({id, name, source, cover, artists, album, duration, favorites, lyric, prev, next}) {
    this.id = id
    this.name = name
    this.source = source
    this.cover = cover
    this.artists = artists
    this.album = album
    this.duration = duration
    this.favorites = favorites
    this.lyric = lyric
    this.prev = prev
    this.next = next
    return this
}
}