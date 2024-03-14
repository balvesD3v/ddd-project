import { Optional } from '@/core/@types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from './comment'

export interface QuestionComentProps extends CommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<QuestionComentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionComentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComent = new QuestionComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return questionComent
  }
}
