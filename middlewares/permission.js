//this middleware will check if the user has permission

const roles = {
  superAdmin: ['createAdmin', 'updateAdmin', 'deleteAdmin', 'createSuperAdmin'],
  admin: [
    'createModerator',
    'updateModerator',
    'deleteModerator',
    'createBank',
    'readBank',
    'updateBank',
  ],
  moderator: [
    'createBank',
    'readBank',
    'updateBank',
    'createWebsite',
    'updateWebsite',
    'readWebsite',
  ],
};

exports.roles = roles;
exports.hasPermission = (permissionName) => {
  return function (req, res, next) {
    // const user = await;
    const currentUserRole = req.role;
    if (roles[currentUserRole]?.includes(permissionName)) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        result: null,
        message: 'Access denied : you are not granted permission.',
      });
    }
  };
};
