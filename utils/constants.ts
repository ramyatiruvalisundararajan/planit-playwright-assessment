export const BASE_URL = 'http://jupiter.cloud.planittesting.com';

export const generateTestData = (runNum: number) => {
  return {
    forename: `Test${runNum}`,
    email: `Test${runNum}@mail.com`,
    message: `Hello Planit! This is test message #${runNum}`,
  };
};

export const formatPrice = (num: number): string => {
  return `$${num.toFixed(2)}`;
};
