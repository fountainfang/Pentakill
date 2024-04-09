let axios;

beforeAll(async () => {
  axios = (await import('axios')).default;
});
const apiBase = 'http://localhost:3300/api';
describe('POST /createOrder', () => {
  it('should create an order and return success message', async () => {
    const orderData = {
      eventId: 1,
      orderDate: '2024-04-10',
      ticketPrice: 100,
      customerId: 1,
    };

    const response = await axios.post(`${apiBase}/createOrder`, orderData);

    expect(response.status).toBe(200);
    expect(response.data.msg).toEqual('success');
  });

  it('should return an error for invalid eventId', async () => {
    const orderData = {
      eventId: 9999,
      orderDate: '2024-04-10',
      ticketPrice: 100,
      customerId: 1,
    };

    const response = await axios.post(`${apiBase}/createOrder`, orderData);

    expect(response.status).toBe(400); 
    expect(response.data.msg).toEqual('Invalid eventId');
  });

  it('should return an error for missing eventId', async () => {
    const orderData = {
      orderDate: '2024-04-10',
      ticketPrice: 100,
      customerId: 1,
    };

    const response = await axios.post(`${apiBase}/createOrder`, orderData);

    expect(response.status).toBe(400); // Assuming your API returns 400 for missing fields
    expect(response.data.msg).toEqual('eventId is required');
  });

  it('should return an error for invalid data format', async () => {
    const orderData = {
      eventId: 1,
      orderDate: '2024-04-10',
      ticketPrice: "one hundred", // Invalid format
      customerId: 1,
    };

    const response = await axios.post(`${apiBase}/createOrder`, orderData);

    expect(response.status).toBe(400);
    expect(response.data.msg).toEqual('Invalid ticketPrice format');
  });

  it('should return an error for past order dates', async () => {
    const orderData = {
      eventId: 1,
      orderDate: '2020-01-01', // Past date
      ticketPrice: 100,
      customerId: 1,
    };

    const response = await axios.post(`${apiBase}/createOrder`, orderData);

    expect(response.status).toBe(400);
    expect(response.data.msg).toEqual('Order date cannot be in the past');
  });

  it('should return an error for invalid customerId', async () => {
    const orderData = {
      eventId: 1,
      orderDate: '2024-04-10',
      ticketPrice: 100,
      customerId: 9999, // Assuming this customer does not exist
    };

    const response = await axios.post(`${apiBase}/createOrder`, orderData);

    expect(response.status).toBe(400);
    expect(response.data.msg).toEqual('Invalid customerId');
  });

  it('should return an error for duplicate orders', async () => {
    const orderData = {
      eventId: 1,
      orderDate: '2024-04-10',
      ticketPrice: 100,
      customerId: 1,
    };
    // Attempt to create the first order
    await axios.post(`${apiBase}/createOrder`, orderData);
    // Attempt to create a duplicate order
    const response = await axios.post(`${apiBase}/createOrder`, orderData);

    expect(response.status).toBe(409); // Conflict error
    expect(response.data.msg).toEqual('Duplicate order');
  });
});
