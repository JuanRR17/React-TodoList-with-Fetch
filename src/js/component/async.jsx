const asyncFun = async () => {
    const response = await fetch('https://api.github.com/users/littlecastrum/')
    return response.json()
  }
  
  const promiseFun = () => {
    return fetch('https://api.github.com/users/littlecastrum/')
      .then(res => {
        return res.json()
      })
  }
  
  (async () => {
    const fetchRes = await promiseFun()
    const fetchRes2 = await asyncFun()
    console.log(fetchRes, fetchRes2)
  })()