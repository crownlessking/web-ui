
import { IAnnotation, TPlatform } from './tuber.interfaces'

export default class AnnotationsController implements IAnnotation {
  constructor(private annotation: IAnnotation) {}
  get htmlTag(): string { return this.annotation.htmlTag ?? '' }
  get createdAt(): Date | undefined { return this.annotation.createdAt }
  get modifiedAt(): Date | undefined { return this.annotation.modifiedAt }
  get isPrivate(): boolean { return this.annotation.isPrivate ?? false }
  get userid(): string { return this.annotation.userid ?? '' }
  get groupid(): string { return this.annotation.groupid ?? '' }
  get videoid(): string { return this.annotation.videoid ?? '' }
  get platform(): TPlatform { return this.annotation.platform ?? '' }
  get startSeconds(): number { return this.annotation.startSeconds ?? 0 }
  get endSeconds(): number { return this.annotation.endSeconds ?? 0 }
  get title(): string { return this.annotation.title ?? '' }
  get note(): string { return this.annotation.note ?? '' }
  get rating(): number { return this.annotation.rating ?? 0 }
  get upvotes(): string { return this.annotation.upvotes || '0' }
  get downvotes(): string { return this.annotation.downvotes || '0' }
  get tags(): string[] { return this.annotation.tags ?? [] }

  set htmlTag(value: string) { this.annotation.htmlTag = value }
  set createdAt(value: Date | undefined) { this.annotation.createdAt = value }
  set modifiedAt(value: Date | undefined) { this.annotation.modifiedAt = value }
  set isPrivate(value: boolean) { this.annotation.isPrivate = value }
  set userid(value: string) { this.annotation.userid = value }
  set groupid(value: string) { this.annotation.groupid = value }
  set videoid(value: string) { this.annotation.videoid = value }
  set platform(value: TPlatform) { this.annotation.platform = value }
  set startSeconds(value: number) { this.annotation.startSeconds = value }
  set endSeconds(value: number) { this.annotation.endSeconds = value }
  set title(value: string) { this.annotation.title = value }
  set note(value: string) { this.annotation.note = value }
  set rating(value: number) { this.annotation.rating = value }
  set upvotes(value: string) { this.annotation.upvotes = value }
  set downvotes(value: string) { this.annotation.downvotes = value }
}