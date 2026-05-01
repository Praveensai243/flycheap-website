exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const data = JSON.parse(event.body);

  const payload = {
    email: data.email,
    attributes: {
      FIRSTNAME:    data.firstName,
      LASTNAME:     data.lastName,
      SMS:          data.phone,
      FROM_AIRPORT: data.fromAirport,
      TO_AIRPORT:   data.toAirport,
      DEP_DATE:     data.depDate,
      RET_DATE:     data.retDate,
      MAX_PRICE:    data.maxPrice,
      FLEX_DAYS:    data.flexDays,
      BOOK_BY:      data.bookBy,
      TIER:         data.tier,
    },
    listIds: [5],
    updateEnabled: true,
  };

  const resp = await fetch('https://api.brevo.com/v3/contacts', {
    method:  'POST',
    headers: {
      'accept':       'application/json',
      'content-type': 'application/json',
      'api-key':      process.env.BREVO_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const result = await resp.json();

  return {
    statusCode: resp.ok ? 200 : 400,
    body: JSON.stringify(result),
  };
};
