export default function shortcut(key, action, args = []) {
  return JSON.stringify({ key, action, args });
}
