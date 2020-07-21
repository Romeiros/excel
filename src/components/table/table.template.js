import {toInlineStyles} from '../../core/utils';
import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

// function toCell(row, col) {
// return `
//   <div class="cell" contenteditable data-col="${col}" data-row="${row}"></div>
// `;
// }

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `
      <div 
        class="cell" 
        contenteditable data-col="${col}" 
        data-id="${id}" 
        data-value="${data || ''}"
        style="${styles}; width: ${getWidth(state.colState, col)}" 
        data-type="cell">${parse(data) || ''}
      </div>
    `;
  };
}

function toColumn({col, index, width}) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, state) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  const height = getHeight(state, index);
  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
      <div class="row-info">
        ${index ? index : ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index + 1);
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFromState(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFromState(state))
      .map(toColumn)
      // .map((col, index) => {
      //   const width = getWidth(state.colState, index);
      //   return toColumn(col, index, width);
      // })
      .join('');

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, col) => toCell(row, col))
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
}
