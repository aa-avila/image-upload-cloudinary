const healthOk = async (req, res, next) => {
  try {
    res.status(200).json({ data: 'OK' });
  } catch (error) {
    next(error);
  }
};

export { healthOk };
