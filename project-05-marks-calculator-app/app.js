const calculateFormEl = document.getElementById("calculateForm");
const resultEl = document.getElementById("result");

const calculateMarks = (event) => {
  const maxMarks = 400;
  event.preventDefault();

  const formData = new FormData(calculateFormEl);

  const data = {};

  formData.forEach((value, key) => {
    data[key] = +value;
  });

  const totalMarks =
    data.maths + data["computer science"] + data.urdu + data.english;
  const percentage = Math.floor((totalMarks / maxMarks) * 100).toFixed(2);
resultEl.innerText = `You have got ${totalMarks} marks out of ${maxMarks} and your percentage is ${percentage}%`;
};
