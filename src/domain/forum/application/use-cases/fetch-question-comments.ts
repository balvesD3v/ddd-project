import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FecthQuestionsCommentsUseCase {
  constructor(
    private readonly questionsCommentRepository: QuestionsCommentRepository,
  ) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionsCommentRepository.findByQuestionId(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}
