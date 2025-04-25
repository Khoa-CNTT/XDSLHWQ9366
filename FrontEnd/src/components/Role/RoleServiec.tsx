export async function fetchLinhVucs() {
  const res = await fetch("http://localhost:8080/linhvuc/linhvucs");
  return res.json();
}
export async function fetchLinhVucById(id: number) {
  const res = await fetch(`http://localhost:8080/linhvuc/linhvucs/${id}`);
  return res.json();
}
