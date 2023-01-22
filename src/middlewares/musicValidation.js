const Joi = require('joi');

module.exports = {
  addMusicValidation: (req, res, next) => {
    const schema = Joi.object({
      archive: Joi.boolean().required(),
      musicName: Joi.string().alphanum().min(3).max(30).required(),
      video: Joi.array().items(Joi.string()).required(),
      audio: Joi.array().items(Joi.string()).required(),
      notes: Joi.array().items(Joi.string()).required(),
    });

    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      return res.status(400).json({status: validationRes.error.details});
    }
    next();
  },

  patchMusicValidation: (req, res, next) => {
    const schema = Joi.object({
      archive: Joi.boolean().optional(),
      video: Joi.array().items(Joi.string()).optional(),
      audio: Joi.array().items(Joi.string()).optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    });

    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      return res.status(400).json({status: validationRes.error.details});
    }
    next();
  },
};
