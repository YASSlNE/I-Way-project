import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-add-script-modal-form',
  templateUrl: './add-script-modal-form.component.html',
  styleUrls: ['./add-script-modal-form.component.css']
})
export class AddScriptModalFormComponent {


    description: string = '';
    solutionCode: any;
    language: any;

    editorOptions: MonacoEditorConstructionOptions =  {
      language: 'html',
      theme: 'vs-dark',
      automaticLayout: true,
      
    };

    programmingLanguages: { value: string, display: string, icon: string }[] = [
      { value: 'javascript', display: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { value: 'python', display: 'Python', icon: 'devicon-python-plain colored' },
      { value: 'java', display: 'Java', icon: 'devicon-java-plain colored' },
      { value: 'cpp', display: 'C++', icon: 'devicon-cplusplus-plain colored' },
      { value: 'csharp', display: 'C#', icon: 'devicon-csharp-plain colored' },
      { value: 'ruby', display: 'Ruby', icon: 'devicon-ruby-plain colored' },
      { value: 'php', display: 'PHP', icon: 'devicon-php-plain colored' },
      { value: 'typescript', display: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { value: 'rust', display: 'Rust', icon: 'devicon-rust-plain colored' },
      { value: 'r', display: 'R', icon: 'devicon-r-plain colored' },
      { value: 'dart', display: 'Dart', icon: 'devicon-dart-plain colored' },
      { value: 'vb', display: 'Visual Basic', icon: 'devicon-vb-plain colored' },
      { value: 'bash', display: 'Bash', icon: 'devicon-bash-plain colored' },
      { value: 'plaintext', display: 'Plain Text', icon: 'devicon-plain colored' },
      { value: 'sql', display: 'SQL', icon: 'devicon-sql-plain colored' },
      { value: 'html', display: 'HTML', icon: 'devicon-html5-plain colored' },
      { value: 'css', display: 'CSS', icon: 'devicon-css3-plain colored' },
    ];
    
    
    constructor(public dialogRef: MatDialogRef<AddScriptModalFormComponent>) {}
  
    ngOnInit(): void {}
  
    onCancelClick(): void {
      this.dialogRef.close();
    }
  
    onSubmitClick(): void {
      this.dialogRef.close(this.description);
    }

    onLanguageSelected(selectedLanguage: string) {
      // You can access the selected value directly without using 'event'
      console.log('Selected language:', selectedLanguage);
    
      // Add your desired logic here
      // For example, you can update the monaco editor's language based on the selected language
      this.editorOptions.language = selectedLanguage;
    }
      
}
