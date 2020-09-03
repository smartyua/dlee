const getProfile = async (req, res, next) => {
  const { Profile } = req.app.get('models');
  const id = req.get('profile_id');

  const profile = await Profile.findOne({
    where: { id: id || 0 }
  });

  if (!profile) {
    return res.status(401).end();
  }

  // eslint-disable-next-line no-param-reassign
  req.profile = profile;
  return next();
};

module.exports = {
  getProfile
};
