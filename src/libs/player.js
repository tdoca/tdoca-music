const coverRootPath = "https://p1.music.126.net/"
const musicRootPath = "https://music.163.com/song/media/outer/url?id="

export const music = function({musicName, musicSource, coverSource}) {
    return {
        musicName,
        musicSource : `${musicRootPath}${musicSource}`,
        coverSource : `${coverRootPath}${coverSource}?param=500y500`
    }
}