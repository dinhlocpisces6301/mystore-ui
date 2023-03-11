export const scrollToPosition = (top = 0) => {
  try {
    /**
     * Latest API
     */
    document.documentElement.scrollTo({
      top: top,
      left: 0,

      behavior: 'smooth',
    });
  } catch (_) {
    /**
     * Fallback
     */
    document.documentElement.scrollTo(0, top);
  }
};

export const uuid = () => {
  let dt = new Date().getTime();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export function currencyFormat(value) {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return formatter.format(value);
}

export function randomColor() {
  const color = [
    '#F7C8E0',
    '#DFFFD8',
    '#B4E4FF',
    '#FFACAC',
    '#FFBFA9',
    '#FBFFB1',
    '#E5D1FA',
    '#CDE990',
    '#FDD36A',
    '#7DB9B6',
    '#E7B10A',
    '#E96479',
    '#B5F1CC',
    '#AA77FF',
    '#FF5D5D',
  ];
  var n = color.length;
  return color[Math.floor(Math.random() * n)];
}
