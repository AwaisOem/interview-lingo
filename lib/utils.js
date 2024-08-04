import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}



export function convertToQuestionAnswersFormat(inputArray) {
  const outputArray = [];
  for (let i = 0; i < inputArray.length; i += 2) {
    const question = inputArray[i];
    const answer = inputArray[i + 1];
    if (question && answer && question.role === 'assistant' && answer.role === 'user') {
      outputArray.push({
        question: question.content,
        answer: answer.content,
        order: outputArray.length
      });
    }
  }
  return outputArray;
}
