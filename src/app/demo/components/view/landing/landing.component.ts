import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { TeamMember } from 'src/app/demo/api/teamMember';
import { Project } from 'src/app/demo/api/project';
import { MailSenderService } from 'src/app/demo/service/mail.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthDialogService } from 'src/app/demo/service/auth-dialog.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls:['./landing.component.scss'],
})
export class LandingComponent {
  emailForm: FormGroup;
  @ViewChild('featuresSection') featuresSection: ElementRef;

  email: string = '';
  subject: string = '';
  message: string = '';
  isNavbarGray = false;
  isResponsiveMenuGray: boolean = false;
  animationState = {
    highlights: 'hide',
    features: 'hide',
    pricing:'hide',
    certif:'hide',
    // Add more section IDs as needed
  };

  images: string[] = [
    'assets/demo/images/landing/score.webp',
    'assets/demo/images/landing/sflow1.webp',
    'assets/demo/images/landing/sflow2.webp'
  ];
  Project :Project[] =
    // Example projects data
     [
        {
            image: 'assets/demo/images/landing/sflow1.webp',
            title: 'Winner Flow',
            description: 'Le Winner Flow est un embout d\'exsufflation utilisé lors d\'exercices respiratoires. Il assure un débit ventilatoire constant.',
           
        },
        {
            image: 'assets/demo/images/landing/sflow2.webp',
            title: 'STIM-Flow',
            description: 'Le STIMFLOW® est un stimulateur biofeedback abdomino-périnéal, associé au Winner Flow, permettant de rééduquer les pathologies de la statique pelvienne.',
            
        },
        {
            image: 'assets/demo/images/landing/score.webp',
            title: 'Scores',
            description: 'Scores est un dispositif médical software destiné aux professionnels de santé et aux patients pour le suivi et la gestion des soins médicaux.',
           
        },
        // Add more projects as needed
    ];
  teamMembers: TeamMember[] = [
    { name: 'John Doe', position: 'Developer', image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png' },
    { name: 'Jane Smith', position: 'Designer', image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png' },
    { name: 'Jane Smith', position: 'Designer', image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png' },
    { name: 'Jane Smith', position: 'Designer', image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png' },
    { name: 'Jane Smith', position: 'Designer', image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png' },
  ];
  
  constructor(private authDialogService: AuthDialogService,private fb: FormBuilder,public layoutService: LayoutService, public router: Router,public el: ElementRef,private mailSenderService: MailSenderService) { 
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.scrollToFeatures();
    this.onScroll();
  }

  scrollToFeatures(): void {
    if (this.featuresSection) {
      this.featuresSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  

  toggleNavbarColor() {
    this.isNavbarGray = true;
}
openAuthDialog() {
  this.authDialogService.openAuthDialog();
}
sendEmail() {
  if (this.emailForm.valid) {
    const mail = {
      email: this.emailForm.value.email,
      subject: this.emailForm.value.subject,
      message: this.emailForm.value.message
    };

    console.log('Mail data from Angular:', mail);

    this.mailSenderService.sendMail(mail).subscribe(
      response => {
        console.log('Email sent successfully:', response);
        this.emailForm.reset();
      },
      error => {
        console.error('Error sending email:', error);
        this.emailForm.reset();
      }
    );
  }
}


    @HostListener('window:scroll', ['$event'])
    onScroll() {
      this.isNavbarGray = window.scrollY > 100; // Adjust the scroll position threshold
      const sections = ['highlights', 'features','pricing','projets','certif']; // Add more section IDs as needed
  
      sections.forEach(section => {
        const offset = 100;
        const threshold = 0.3;
  
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const element = document.getElementById(section);
  
        if (element) {
          const elementPosition = element.offsetTop;
          const elementHeight = element.offsetHeight;
  
          const isVisible =
            scrollPosition + windowHeight > elementPosition + offset &&
            scrollPosition < elementPosition + elementHeight - offset;
  
          this.animationState[section] = isVisible ? 'show' : 'hide';
        }
      });
    }
 

    
  }
