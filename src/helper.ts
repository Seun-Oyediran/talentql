type IRowData = Array<{
  age: number;
  gender: string;
  id: string;
  row: number;
}>;

const tableBody = document.querySelector('[data-sink="table-body"]');
const API_URL = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";

function generateApiUrl(page: number) {
  return `${API_URL}&page=${page}`;
}

export async function fetchData(page: number) {
  try {
    const jsonData = await fetch(generateApiUrl(page));
    const data = await jsonData.json();
    return data;
  } catch (error) {
    alert(error?.message || error?.response?.data?.message);
  }
}

export function isEvenNumber(number: number) {
  return number % 2 === 0;
}

export function useUpdateTable(data: IRowData) {
  tableBody?.replaceChildren("");
  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-entryid", data[i].id);
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    const text1 = document.createTextNode(data[i].row.toString());
    const text2 = document.createTextNode(data[i].gender);
    const text3 = document.createTextNode(data[i].age.toString());

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tableBody?.appendChild(tr);
  }
}

export function disableButton(element: Element | null) {
  element?.setAttribute("disabled", "disabled");
}

export function enableButton(element: Element | null) {
  element?.removeAttribute("disabled");
}
