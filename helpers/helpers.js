function deepFlatten(obj, returnObj) {
  for (let prop in obj)
	{
		if (typeof obj[prop] === 'object') {
			deepFlatten(obj[prop], returnObj);
    }	else {
			returnObj[prop] = obj[prop];
    }
  }

  return returnObj;
}
