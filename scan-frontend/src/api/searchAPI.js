export const fetchDocuments = async (params) => {
  const response = await fetch('/api/documents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  });
  return await response.json();
};