export const getFunctionalities = async () => {
  const res = await fetch(
    "https://tworkplate-api.onrender.com/api/funcionalidades",
  );
  if (!res.ok) throw new Error(`Error ${res.status}`);
  const data = await res.json();

  return data; // ← devolver directo, content ya es objeto
};
