const express = require('express');
const router = express.Router();
const moment = require('moment');

/* -----Student Start----- */

router.get('/getall', async (req, res) => {
    try {
      const studentResult = await global.sequelizeModels.studentDetails.findAll({});
      res.json({ success: true, data: studentResult });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: 'Something Went Wrong' });
    }
  });

router.post('/', async (req, res) => {
  try {
    const studentDetails = req.body;

    const studentCount = await global.sequelizeModels.studentDetails.count({
      where: {
        [global.sequelize.Op.or]: [
          { email: studentDetails.email },
          { mobileNumber: studentDetails.mobileNumber }
        ],
      }
    });

    if (studentCount > 0) {
      return res.json({ success: false, message: 'Student phone or email exist' });
    }


    const dateOfBirthYear = moment(studentDetails.dob).format("YYYY");
    const currentYear = moment().format('YYYY');
    studentDetails.age = currentYear - dateOfBirthYear;
    if (studentDetails.age <= 0) {
      studentDetails.age = null;
    }
    await global.sequelizeModels.studentDetails.create(studentDetails);
    res.json({ success: true, message: 'Student added successfully' });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Something Went Wrong' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const studentDetails = req.body;
    const studentCount = await global.sequelizeModels.studentDetails.count({
      where: {
        [global.sequelize.Op.or]: [
          { email: studentDetails.email },
          { mobileNumber: studentDetails.mobileNumber }
        ],
        id: {
          [global.sequelize.Op.ne]: req.params.id,
        },
      }
    });
    
    if (studentCount > 0) {
      return res.json({ success: false, message: 'Student phone or email exist' });
    }

    const dateOfBirthYear = moment(studentDetails.dob).format("YYYY");
    const currentYear = moment().format('YYYY');
    studentDetails.age = currentYear - dateOfBirthYear;
    if (studentDetails.age <= 0) {
      studentDetails.age = null;
    }
    await global.sequelizeModels.studentDetails.update(studentDetails, {
        where: {
          id: req.params.id,
        },
    });
    res.json({ success: true, message: 'Student updated successfully' });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Something Went Wrong' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentDetailsById = await global.sequelizeModels.studentDetails.findByPk(studentId);
    res.json({ success: true, data: studentDetailsById });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Something Went Wrong' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    await global.sequelizeModels.studentDetails.destroy({
      where: {
        id: studentId,
      }
    });
    res.json({ success: true , message: 'Student deleted successfully'});
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Something Went Wrong' });
  }
});


/* -----Student End----- */

module.exports = router;
