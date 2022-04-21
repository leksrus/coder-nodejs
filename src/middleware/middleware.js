

export const validateAdmin = ((req, res, next) => {

  if(req.method !== 'GET' && !req.path.toLowerCase().includes('cart')){
    const isAdmin = (req.body.isAdmin?.toLowerCase() === 'true');

    console.log(req.path);

    if(!isAdmin) return res.status(403).json({error: -1, message: 'Access forbiden. It si for admins only', method: req.method, route: req.path});
  }
  
  next();
});


export default { validateAdmin };