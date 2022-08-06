import {
  disableButton,
  enableButton,
  fetchData,
  isEvenNumber,
  toggleLoader,
  useUpdateTable,
} from "./helper";

let result;
let currentPage = 1;

const nextBtn = document.querySelector('[data-nextbtn="next-btn"]');
const prevBtn = document.querySelector('[data-prevbtn="prev-btn"]');

nextBtn?.addEventListener("click", handleNext);
prevBtn?.addEventListener("click", handlePrev);

async function handleNext() {
  toggleLoader();
  currentPage += 1;

  if (!isEvenNumber(currentPage)) {
    disableButton(nextBtn);
    result = await fetchData(currentPage);

    if (result.results[0].paging.next) {
      enableButton(nextBtn);
    }
  }

  enableButton(prevBtn);
  toggleLoader(currentPage);
  useUpdateTable(result.results[0][`${currentPage}`]);
}

async function handlePrev() {
  // if (currentPage < 2) return;
  toggleLoader();
  currentPage -= 1;

  if (isEvenNumber(currentPage)) {
    disableButton(prevBtn);
    result = await fetchData(currentPage - 1);
    enableButton(prevBtn);
  }

  if (currentPage === 1) {
    disableButton(prevBtn);
  }

  toggleLoader(currentPage);
  useUpdateTable(result.results[0][`${currentPage}`]);
}

const startApp = async () => {
  toggleLoader();
  disableButton(nextBtn);
  disableButton(prevBtn);
  result = await fetchData(currentPage);

  if (result.results[0].paging.next) {
    enableButton(nextBtn);
  }

  toggleLoader(currentPage);
  useUpdateTable(result.results[0][`${currentPage}`]);
};

document.addEventListener("DOMContentLoaded", startApp);
