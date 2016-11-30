import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../../services/index';

@Component({
    templateUrl: 'template.component.html'
})

export class TemplateComponent implements OnInit {
    title: string;
    @ViewChild('canvasF') canvasRefF;
    @ViewChild('canvasB') canvasRefB;
    template: any = [];
    template_elements: any = [];
    params: any = [];
    objCVS: any = [];
    source = new Image();
    image_default: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    image: any = [];
    files: any = [];
    firstLoad: any = [];
    canvasF = null;
    canvasB = null;
    context = null;

    constructor(
        private route: ActivatedRoute,
        private cardService: CardService,
        private element: ElementRef
    ) {
        this.title = route.snapshot.data['name'];
        route.params.subscribe(params => this.params = params);
    }

    ngOnInit() {
        this.loadTemplate();
    }

    loadTemplate() {
        this.canvasF = this.canvasRefF.nativeElement;
        this.canvasB = this.canvasRefB.nativeElement;
        return this.cardService.getTemplate(this.params['id']).subscribe(response => {
            response.data.template_elements.forEach((value: any) => {
                value.element_attr = JSON.parse(value.element_attr);
            })
            this.template = response.data.template;
            this.template_elements = response.data.template_elements;
            this.objCVS = this.template;
            this.objCVS.element = this.template_elements;
            this.render(this.canvasF, this.objCVS, this.image_default, 0);
            this.render(this.canvasB, this.objCVS, this.image_default, 1);
        });
    }

    textChange(event, ele) {
        this.objCVS.element.forEach((value: any) => {
            if (value.id == ele.id) {
                value.element_attr.text = event.target.value;
            }
        });
        let canvas, target;
        if (ele.front_back == 0) {
            canvas = this.canvasF;
            target = 0;
        }
        else if (ele.front_back == 1) {
            canvas = this.canvasB;
            target = 1;
        }
        this.render(canvas, this.objCVS, this.image[ele.front_back], target);
    }

    fileChange(event, ele) {
        var reader = new FileReader();
        reader.onload = () => {
            this.image[ele.front_back] = reader.result;
            let canvas, target;
            if (ele.front_back == 0) {
                canvas = this.canvasF;
                target = 0;
            }
            else if (ele.front_back == 1) {
                canvas = this.canvasB;
                target = 1;
            }
            this.render(canvas, this.objCVS, this.image[ele.front_back], target);
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    render(canvas, objCVS, src, target) {
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = objCVS.fill_style;
        context.fillRect(0, 0, canvas.width, canvas.height);
        if (target == 0) localStorage.removeItem('image_front');
        else if (target == 1) localStorage.removeItem('image_back');

        let source = new Image();
        source.crossOrigin = 'Anonymous';
        source.src = src;
        source.onload = () => {
            this.files.forEach((value: any) => {
                if (typeof value.element_attr !== 'undefined') {
                    context.drawImage(source, value.element_attr.x, value.element_attr.y,
                        value.element_attr.width, value.element_attr.height);
                }
            });
            objCVS.element.forEach((value: any) => {
                if (value.front_back == target) {
                    if (value.element_type == 'file') {
                        if (typeof this.files[value.id] === 'undefined') {
                            this.files[value.id] = value;
                            this.image[value.front_back] = value.element_attr.text;
                            source.src = this.image[value.front_back];
                            context.drawImage(source, value.element_attr.x, value.element_attr.y,
                                value.element_attr.width, value.element_attr.height);
                        }
                    }
                    else {
                        context.font = value.element_attr.font;
                        context.textAlign = value.element_attr.textAlign;
                        context.fillStyle = value.element_attr.fillStyle;
                        if (typeof value.element_attr.wrapText != 'undefined') {
                            this.doWrapText(context, value.element_attr.text, value.element_attr.x, value.element_attr.y,
                                value.element_attr.wrapText.width, value.element_attr.wrapText.lineHeight);
                        }
                        else {
                            context.fillText(value.element_attr.text, value.element_attr.x, value.element_attr.y);
                        }
                    }
                }
            });
            if (target == 0) localStorage.setItem('image_front', canvas.toDataURL('image/png'));
            else if (target == 1) localStorage.setItem('image_back', canvas.toDataURL('image/png'));
        };
    }

    doWrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }
}