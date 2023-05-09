export function AddQuestion(oldChat: string, question: string): string {
  return oldChat + "@#$Q." + question;
}

export function AddAnswer(oldChat: string, answer: string): string {
  if (!answer)
    return oldChat + "@#$A." + "sorry! can't get the answer. please try again!";
  return oldChat + "@#$A." + answer;
}

export function convertToArray(chat: string): string[] {
  return chat.split("@#$");
}
