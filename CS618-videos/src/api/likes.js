export const trackLike = (like) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(like),
  }).then((res) => res.json())

/*export const createLike = async ({ postId }) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/
likes`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({postId}),
    },
  ).then((res) => res.json())
}*/

export const getTotalLikes = (postId) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/likes/totalLikes/${postId}`).then(
    (res) => res.json(),
  )
