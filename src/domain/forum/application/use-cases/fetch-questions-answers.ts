import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FecthQuestionsAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FecthQuestionsAnswersUseCaseResponse {
  answers: Answer[]
}

export class FecthQuestionsAnswersUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FecthQuestionsAnswersUseCaseRequest): Promise<FecthQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}
