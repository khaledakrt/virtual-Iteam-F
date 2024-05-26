import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/demo/service/blog.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-sections-view',
  templateUrl: './sections-view.component.html',
  styleUrls: ['./sections-view.component.scss'],
  encapsulation: ViewEncapsulation.None  // Add this line

})
export class SectionsViewComponent implements OnInit {
  isNavbarGray = false;
  isResponsiveMenuGray: boolean = false;
  blogContent: string = ''; // Assuming the content is a string
  relatedArticles: any[] = []; // Change this type based on your blog model

  constructor(
    public layoutService: LayoutService,
    public router: Router,
    private blogService: BlogService ,// Inject the BlogService
    private route: ActivatedRoute // Inject ActivatedRoute

  ) {}

  ngOnInit() {
    // Extract blog ID from the route parameters
    const blogId = this.route.snapshot.paramMap.get('id');
    this.fetchBlogContent('65c4caa8924434de49249681');
    this.fetchAllBlogs();

  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isNavbarGray = window.scrollY > 20; // Adjust the scroll position threshold
  }

  toggleNavbarColor() {
    this.isNavbarGray = true;
  }

  fetchBlogContent(blogId: string) {
    this.blogService.getBlogContent(blogId).subscribe(
      (content: string) => {
        this.blogContent = content || '';
      },
      (error) => {
        console.error('Error fetching blog content:', error);
      }
    );
  }
  fetchAllBlogs() {
    this.blogService.getAllBlogs().subscribe(
      (blogs: any[]) => {
        for (const blog of blogs) {
          this.extractBlogInfo(blog);
        }
      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }
  extractBlogInfo(blog: any) {
    // Extract data from HTML content
    const doc = new DOMParser().parseFromString(blog.content, 'text/html');
    const title = doc.querySelector('h1')?.innerText || 'No Title';
    const imageSrc = doc.querySelector('img')?.getAttribute('src') || '';

    // Add to related articles
    this.relatedArticles.push({
      title: title,
      image: imageSrc,
      content: blog.content, // You can include the whole content if needed
    });
  }

}
