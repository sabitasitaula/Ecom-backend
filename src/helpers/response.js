export const okResponse = ({ status, data, res }) => {
  try {
    const resObj = {
      success: true,
      code: status,
      payload: {
        data: data,
      },
    };
    res.status(status).send(resObj);
  } catch (err) {
    return err.message;
  }
};
export const errorResponse = ({ status, message, res }) => {
  try {
    const resObj = {
      success: false,
      code: status,
      message: message,
    };
    res.status(status).send(resObj);
  } catch (err) {
    return err.message;
  }
};
