//imports

//let schedulesData = require("../data/data");
function generateRandomId() {
  const timestamp = new Date().getTime().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 5);

  return `${timestamp}-${randomPart}`;
}
let schedulesData = [
  {
    id: generateRandomId(),
    Title: "Going to sleep",
    Description: "Sample Description",
    Subject: "Sample Subject",
    Frequency: "Daily",
    Time: "10:00 PM",
  },
  {
    id: generateRandomId(),
    Title: "Playing football",
    Description: "Sample Description",
    Subject: "Sample Subject",
    Frequency: "Daily",
    Time: "11:00 AM",
  },
];

const getSchedules = async (req, res) => {
  try {
    const { search } = req.query;
    if (search) {
      const filteredSchedules = schedulesData.filter((sched) => sched.Title.toLowerCase().startsWith(search.toLowerCase()));
      res.status(200).json(filteredSchedules);
    }
    else{
        //if (schedulesData.length) 
        res.status(200).json(schedulesData);
        //else res.status(404).send({ message: "No schedules found" });
    }
  } catch (err) {
    res.sendStatus(500);
  }
};


const getSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const filteredSchedules = schedulesData.filter((sched) => sched.id == id);
      res.status(200).json(filteredSchedules);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const body=req.body;
   for(let [key, value] of Object.entries(body)) {
      if(value=="")
        delete body[key];
   }
    console.log(body)
    if (id) {
      const updatedSchedulesData = schedulesData.map((schedule) => {
        if (schedule.id == id) {
          return { ...schedule, ...body };
        }
        return schedule;
      });
      schedulesData=[...updatedSchedulesData];
      res.status(200).json(schedulesData);
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const indexToDelete = schedulesData.findIndex((sched) => sched.id == id);
      console.log(indexToDelete)
      if (indexToDelete !== -1) {
        schedulesData.splice(indexToDelete, 1);
      }
      res.status(200).json(schedulesData);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

const createSchedule = async (req, res) => {
  try {
    const body = req.body;
    schedulesData.push({ id: generateRandomId(), ...body });
    console.log(schedulesData);
    res.status(200).json(schedulesData); 
    }
   catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
  createSchedule,
};
