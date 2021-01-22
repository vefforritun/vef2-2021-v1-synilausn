function zeropad(n) {
  const s = n.toString();
  if (s.length === 1) {
    return `0${n}`;
  }

  return s;
}

export function formatAge(age) {
  const secs = Math.floor((new Date().getTime() - age) / 1000);

  const years = Math.floor(secs / (60 * 60 * 24 * 365));
  if (years > 1) {
    const yearString = years === 1 ? 'ári' : 'árum';
    return `Fyrir ${years} ${yearString} síðan`;
  }

  const months = Math.floor((secs - years) / (60 * 60 * 24 * 30));
  if (months > 1) {
    const monthString = months === 1 ? 'mánuði' : 'mánuðum';
    return `Fyrir ${months} ${monthString} síðan`;
  }

  const weeks = Math.floor((secs - months) / (60 * 60 * 24 * 7));
  if (weeks > 1) {
    const weeksString = weeks === 1 ? 'viku' : 'vikum';
    return `Fyrir ${weeks} ${weeksString} síðan`;
  }

  const days = Math.floor((secs - weeks) / (60 * 60 * 24));
  if (days >= 1) {
    const daysString = days === 1 ? 'degi' : 'dögum';
    return `Fyrir ${days} ${daysString} síðan`;
  }

  const hours = Math.floor((secs - days) / (60 * 60));
  const hoursString = hours === 1 ? 'klukkustund' : 'klukkustundum';
  return `Fyrir ${hours} ${hoursString} síðan`;
}

export function formatDuration(duration) {
  const mins = Math.floor(duration / 60);
  const secs = zeropad(duration % 60);

  return `${mins}:${secs}`;
}
