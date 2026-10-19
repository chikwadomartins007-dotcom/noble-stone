export const formatPrice = (amount: number, currency: string = '₦'): string => {
  return `${currency}${amount.toLocaleString('en-US')}`;
};

export const generateOrderId = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = 'NB-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const NIGERIAN_STATES = [
  'Lagos',
  'Abuja (FCT)',
  'Rivers (Port Harcourt)',
  'Oyo (Ibadan)',
  'Delta (Asaba / Warri)',
  'Edo (Benin City)',
  'Enugu',
  'Anambra (Awka / Onitsha)',
  'Kano',
  'Kaduna',
  'Akwa Ibom (Uyo)',
  'Cross River (Calabar)',
  'Ogun (Abeokuta / Ota)',
  'Ondo (Akure)',
  'Osun (Osogbo)',
  'Imo (Owerri)',
  'Abia (Umuahia / Aba)',
  'Kwara (Ilorin)',
  'Plateau (Jos)',
  'Benue',
  'Bayelsa',
  'Ebonyi',
  'Ekiti',
  'Kogi',
  'Nasarawa',
  'Niger',
  'Bauchi',
  'Gombe',
  'Adamawa',
  'Taraba',
  'Borno',
  'Yobe',
  'Jigawa',
  'Katsina',
  'Kebbi',
  'Sokoto',
  'Zamfara'
];

export const generateWhatsAppOrderLink = (
  orderId: string,
  customerName: string,
  phone: string,
  productTitle: string,
  finishName: string,
  price: string,
  address: string,
  state: string
): string => {
  const officialPhone = '2349117446764';
  const text = `*NEW ORDER - NOBLESTONE BATHROOMS* 🏛️
-----------------------------------
*Order Reference:* ${orderId}
*Customer Name:* ${customerName}
*Phone Number:* ${phone}
*Item:* ${productTitle}
*Finish:* ${finishName}
*Total Amount:* ${price}
*Delivery Address:* ${address}, ${state}
*Payment Choice:* Pay on Delivery (Inspect First)
-----------------------------------
Hello Noblestone Bathrooms, please confirm my order dispatch!`;

  return `https://wa.me/${officialPhone}?text=${encodeURIComponent(text)}`;
};
