// blog.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { QuillService } from 'ngx-quill';
import { MessageService } from 'primeng/api';
import Quill from 'quill';
import { BlogService } from 'src/app/demo/service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  providers: [MessageService]
})
export class BlogComponent implements AfterViewInit {
  @ViewChild('quillEditor', { static: true }) quillEditor!: ElementRef;
  blogMember = { content: '' };
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService,private quillService: QuillService,private blogService:BlogService) {}

  ngAfterViewInit() {
    const quill = this.quillService.getQuill();

    if (this.quillEditor) {
      const editor = new Quill(this.quillEditor.nativeElement, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
          ],
        },
      });

      editor.on('text-change', () => {
        this.blogMember.content = editor.root.innerHTML;
      });
    }
  }


  onSave() {
    // Assuming you have a Blog object with the necessary properties
    const blog = { content: this.blogMember.content };

    // Call the service method to save the content
    this.blogService.saveBlogContent(blog).subscribe(
      (response) => {
        console.log('Blog content saved successfully:', response);
        // Handle any additional logic or UI updates
      },
      (error) => {
        console.error('Error saving blog content:', error);
        // Handle error scenarios
      }
    );
  }

  onUpload(event: any) {
    for (const file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
}
}
