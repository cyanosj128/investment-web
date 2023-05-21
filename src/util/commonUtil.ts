export const ItemUtil = {
  getImageURL(imageUrl: string) {
    return `/src/assets/images/item/${imageUrl}.png`;
  },
};

export const DateUtil = {
  formatDate(seconds: number) {
    const datePart = new Date(seconds * 1000).toISOString().split('T')[0];
    const [year, month, date] = datePart.split('-');
    return `${year.slice(2)}-${month}-${date}`;
  },
};

export const NumberUtil = {
  removeDecimalZeros(value: string) {
    if (value.indexOf('.') === -1 || value.length < 3) {
      return value;
    }

    let count = value.length - 1;
    while (value[count] === '0') {
      count--;
    }

    let newValue = value.slice(0, count + 1);
    return newValue[newValue.length - 1] !== '.'
      ? newValue
      : newValue.slice(0, count);
  },
  toDisplayNumber(value: string) {
    return NumberUtil.addComma(NumberUtil.removeDecimalZeros(value));
  },
  addComma(value: string) {
    return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  },
};
