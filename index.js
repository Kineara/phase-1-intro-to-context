function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array) {
  const employeeRecords = array.map(array => createEmployeeRecord(array));
  return employeeRecords;
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const timeInEvent = {
    type: "TimeIn",
    hour: parseFloat(dateStamp.slice(11)),
    date: dateStamp.slice(0,10)
  }

  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const timeOutEvent = {
    type: "TimeOut",
    hour: parseFloat(dateStamp.slice(11)),
    date: dateStamp.slice(0,10)
  }

  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
  const punchIn = employeeRecord.timeInEvents.find((element) => element.date === dateStamp);
  const punchOut = employeeRecord.timeOutEvents.find((element) => element.date === dateStamp);

  return (punchOut.hour - punchIn.hour) * .01;
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp);
  const hourlyRate = employeeRecord.payPerHour;
  return hoursWorked * hourlyRate;
}

function allWagesFor(employeeObject) {
  const datesWorked = employeeObject.timeInEvents.map((element) => element.date);
  const wagesEarnedArray = datesWorked.map((element) => wagesEarnedOnDate(employeeObject, element));
  const totalWages = wagesEarnedArray.reduce((total, num) => total + num);
  return totalWages;
}

function calculatePayroll(employeeRecordsArray) {
  const totalIndividualPayArray = employeeRecordsArray.map(allWagesFor)
  const totalPayroll = totalIndividualPayArray.reduce((total, num) => total + num);
  return totalPayroll;
}