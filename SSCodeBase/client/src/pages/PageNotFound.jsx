import pageNotFoundGif from '../Assets/crying-pixelated-anime-girl.gif'

export default function PageNotFound() {
  return (
    <div style={{
      fontFamily: "'Times New Roman', Times, serif"
    }}>
      <img src={pageNotFoundGif} alt='' />
      <h1 style={{
        textIndent: "85px"
      }}>Page not found. :(</h1>
    </div>
  )
}
