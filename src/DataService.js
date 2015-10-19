import Firebase from 'firebase'
import Immutable from 'immutable'

const posts = new Firebase('https://crackling-inferno-5250.firebaseio.com/posts')

const valWithKey = (snapshot) => { return { ... snapshot.val(), key: snapshot.key() } }

export function fetchPost (key) {
  return new Promise((resolve, reject) => {
    const post = posts.child(key).once('value', snapshot => {
      const val = valWithKey(snapshot)
      resolve(Immutable.fromJS(val))
    })
  })
}

export function recentPosts (count = 3) {
  return new Promise((resolve, reject) => {
    const fetchedPosts = []
    const fetchProcessor = (snapshot) => {
      const val = valWithKey(snapshot)
      fetchedPosts.unshift(val)
      if (fetchedPosts.length === count) {
        resolve(Immutable.fromJS(fetchedPosts))
        posts.off('child_added', fetchProcessor)
      }
    }
    posts
      .orderByChild('date')
      .limitToLast(count)
      .on('child_added', fetchProcessor)
  })

}

export function loginWithGoogle () {
  return new Promise((resolve, reject) => {
    posts.authWithOAuthPopup("google", (error, authData) => {
      if (error) {
        reject(error)
      } else {
        testWrite()
          .then(() => resolve(authData))
          .catch((writeError) => reject(writeError))
      }
    })
  })
}

const testWrite = () => {
  return new Promise((resolve, reject) => {
    posts.child('canLogin').set('yep!', error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

export function savePost (key, postAsImmutable) {
  return new Promise((resolve, reject) => {
    posts.child(key).set(postAsImmutable.toJS(), error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
