// https://www.scorebat.com/video-api/v1/
const soccerLeagues = document.getElementById('soccer-leagues')
const form = document.querySelector('form')
let matchItems = []

const fetchSoccerData = async () => {
  return await fetch('https://www.scorebat.com/video-api/v1/')
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err, 'error'))
}

const toggleEmbeds = (target) => {
  return matchItems.map(item => {
    const matchContainer = item.querySelector('.match-container')
    const embedContainer = item.querySelector('.embed-container')
    const link = item.querySelector('.match-thumbnail-link')

    if (!item.contains(target)) { 
      link.style.display = 'block'
      
      embedContainer.style.display = 'none'    
    } else {
      target.style.display = 'none'

      embedContainer.style.display = 'block'

      embedContainer.innerHTML = matchContainer.dataset.embed
    }
    return item
  })
}

document.addEventListener('DOMContentLoaded', () => {
  fetchSoccerData().then(data => {
    const listItems = data.map((item, index) => {
      const competition = `${item.side1.name} vs ${item.side2.name}`
      return `<li id='match-${index}'>
        <h2>${competition}</h2>
        <p><a href="${item.competition.url}">See all live scores from ${item.competition.name}</a></p>
        <div class="match-container" data-embed="${item.embed}" data-thumbnail="${item.thumbnail}">
          <div class="embed-container"></div>
          <a class="match-thumbnail-link" href="#" aria-label="play ${competition}">
            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%" class="button-play"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fill-opacity="0.8"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>
            <img src="${item.thumbnail}" alt="${competition}" class="match-thumbnail" />
          </a>
        </div>
      </li>`
    }).join("")
    soccerLeagues.innerHTML = listItems
    matchItems = Array.from(soccerLeagues.querySelectorAll('li'))
  })
  .catch(err => console.log(err))
})

soccerLeagues.addEventListener('click', (event) => {

  if (!event.target.classList.contains('match-thumbnail-link')) return
  
  event.preventDefault()
  
  toggleEmbeds(event.target)
})

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const text = form.querySelector('#match-filter').value.toLowerCase()

  return matchItems.filter(item => {

    const matchTitle = item.querySelector('h2')
    const matchName = matchTitle.innerText.toLowerCase()
    const closestItem = matchTitle.closest('li')

    if (matchName.indexOf(text) === -1) {
      closestItem.style.display = 'none'
    } else {
      closestItem.style.display = 'block'
    }

    return item
  })

}) 