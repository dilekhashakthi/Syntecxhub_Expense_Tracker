const formatUser = (user) => {
  if (!user) return null;
  return {
    id: user._id || user.id,
    fullName: user.fullName,
    email: user.email,
    profileImageUrl: user.profileImageUrl || null,
  };
};

module.exports = formatUser;
