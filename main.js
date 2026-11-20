let state = {
  data: null, // list of course objects
  course: 0 // course object index
}

// load the course data from local CSV file
// and store it in our state object.
async function loadCourseData () {
  let res = await fetch('data/historic.csv')
  let csv = await res.text()
  state.data = nn.parse(csv)
}

function randomClass () {
  // pick random integer from the courses array
  const r = nn.randomInt(state.data.length)
  state.course = r // update current course index in state
  // pull out this course object from state data
  const obj = state.data[r]
  console.log(r, obj)
  // pull data from object
  const t = obj['Class Title']
  const n = obj['Course Number']
  const p = obj['Instructor(s)']
  // apply data to custom element
  const card = nn.get('#ran-course-card')
  card.set('title', t)
  card.set('num', n)
  card.set('prof', p)
}

nn.on('load', loadCourseData)
nn.get('#ran-course-button').on('click', randomClass)
