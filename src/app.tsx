
import {
  Box,
  Button,
  FormField,
  Grid,
  ImageCard,
    ColorSelector,
    Select,
    TextInput,
  NumberInput,
  Rows,
  Text,
} from "@canva/app-ui-kit";

import Openai from "openai";
import { createRichtextRange } from "@canva/design";
// import { addElementAtCursor, addElementAtPoint } from "@canva/design";
// import { useFeatureSupport } from "utils/use_feature_support";
import { createRoot } from "react-dom/client";
import { findFonts } from "@canva/asset";
import { upload } from "@canva/asset";
import { openColorSelector } from "@canva/preview/asset";
import { getTemporaryUrl } from "@canva/asset";
import {Swatch } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import img1 from "assets/images/img1.jpg";
import img2 from "assets/images/img2.jpg";
import img3 from "assets/images/img3.jpg";
import img4 from "assets/images/img4.jpg";
import img5 from "assets/images/img5.jpg";
import img6 from "assets/images/img6.jpg";
import img7 from "assets/images/img11.jpg";
import img8 from "assets/images/img12.jpg";
import img9 from "assets/images/img13.jpg";
import img10 from "assets/images/img14.jpg";
import weather from "assets/images/weather.jpg";
import CryptoJS from 'crypto-js';
import { useState, useCallback } from "react";
import * as React from "react";
import baseStyles from "styles/components.css";
import { upload, Font, requestFontSelection } from "@canva/asset";
var fontSize : TextAttributes["fontSize"] = 35;
var is3D : TextAttributes["is3D"] = false;
var fontStyle : TextAttributes["fontStyle"] = "normal";
var fontweight : TextAttributes["fontWeight"] = "bold";
var OPENAI_API_KEY = "";


//var color = "#ff0099";
var file = {};
var href = "Enter a valid Url";
var style = "normal"
var g = "YAFdJjTk5UU:0";
var g1 = "Canva Sans"
var  text = "Enter text here..";
var key1 = ""
var imtt = img5,
const images = {
img1: {
title: "Flyhigh",
imageSrc: img1,
desc: "Soaring above this summer.\n We rise above our troubles\n and fly among the clouds.",
},
img2: {
title: "Godeep",
imageSrc: img2,
desc: "Enjoying the ocean blue. \nWe observe the pulls of the tide\n and imagine a future just as beautiful.",
},
img3: {
title: "Scenery",
imageSrc: img3,
desc: "Relaxing on a peaceful harbor.\n We think of sailing away\n on a new adventure.",
},
img4: {
title: "Gogreen",
imageSrc: img4,
desc: "Beholding the beauty of wildlife.\n We imagine ourselves as these two birds,\n relaxing in their beautiful home.",
},
img5: {
title: "Birds",
imageSrc: img5,
desc: "Flying high above the rest.\n We wonder what adventures\n the birds will go on.",
},
img6: {
title: "Tri",
imageSrc: img6,
desc: "The beauty of triangles.\n We marvel at its points and lines.",
},
img7: {
title: "Tri1",
imageSrc: img7,
desc: "Strolling in nature is your best tonic.",
},
    img8: {
    title: "Tri2",
    imageSrc: img8,
    desc: "Lily always stands out in a still pond.",
    },
    img9: {
    title: "Tri3",
    imageSrc: img9,
    desc: "One always dreams good, walking through the nature's realm. ",
    },
    img10: {
    title: "Tri4",
    imageSrc: img10,
    desc: "The vastness of an ocean often makes one forget tiny indifferences.",
    },

    imgt: {
    title: "Tri5",
    imageSrc: imtt,
    desc: "Enter your text",
    },

};
type AppElementData = {
  width: number;
  height: number;
};

var  fontcolor="#ff0099"
type UIState = AppElementData;
var img = images["img1"].imageSrc;
//var text = images["img1"].desc;

var initialState: UIState = {
  width: 2500,
  height: 1500,
  //  fontcolor:"#ff0099"
};

 fetch('https://nvyn2qbgz9.execute-api.us-east-1.amazonaws.com/default/textauthcanva').then( (response) =>  response.json())
 .then ( async (data) =>  {
     if (!data) {
         alert("Error getting the OPEN AI KEY")
     }
     else
     {
         const decrypt1 = data;
          console.log("decrypt1-aut with iv",decrypt1);
      //  OPENAI_API_KEY = await decrypt1;
        const decrypted = CryptoJS.AES.decrypt(decrypt1,"",{});
         console.log("decrypted=================================",decrypted)
         OPENAI_API_KEY = decrypted.toString(CryptoJS.enc.Utf8);

     }
});
console.log("The response is========================================",OPENAI_API_KEY);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
export const App = () => {

  //  const app = express();

 //   var [imageUrl, setImageUrl] = useimg;
 //   const isSupported = useFeatureSupport();
 const [color, setColor] = React.useState<string>(fontcolor);
  const [dataUrl, setDataUrl] = useState(img1);
  const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState<UIState>(initialState);
    var {width, height} = state;
  const disabled = !dataUrl || dataUrl.trim().length < 1;

    const [selectedFont, setSelectedFont] = React.useState<Font | undefined>();

      const message = selectedFont
        ? `The selected font is ${selectedFont.name}.`
        : `There is no font selected.`;


   async function handleFont() {
        const fontResponse = await requestFontSelection({
        selectedFontRef: selectedFont?.ref, // Specify the selected font, if one is defined
        });

        if (fontResponse.type !== "COMPLETED") {
            return;
        }
       g = fontResponse.font.ref;
       g1 = fontResponse.font.name
       const {fonts} = await  findFonts({ fontRefs: [g] });

        // Update the currently selected font
        console.log("The selected font ref is===================================",g)
        setSelectedFont(g);


    }


    async function gentext(text) {
        const openai2 = new Openai({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });
          const response = await openai2.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: "Write a motivational or an inspirational line from the image with no pleasentries. If its an abstract or geometric image just say something." },
                  {
                    type: "image_url",
                    image_url: {
                      "url": img,
                      "detail": "low"
                    },
                  },
                ],
              },
            ],
          });
           text = response.choices[0].message.content
          console.log(response.choices[0].message.content);
        return text;

    }

    async function main1() {
        const openai1 = new Openai({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });
      const completion = await openai1.chat.completions.create({
        messages: [
            {"role": "user", "content": "Generate a motivational text with 4 lines."},
            ],
        model: "gpt-4o-mini",
      });

      console.log(completion.choices[0].message.content);
       text = completion.choices[0].message.content;
        addText()
    }


    const addText = useCallback(async () => {
      setIsLoading(true);
        console.log("Text loading =========================",text);
      try {

           await addNativeElement({
                //     const  result  = await upload({
                type: "TEXT",
                children: [text],
                fontRef : g,
                color: fontcolor,
                fontStyle: fontStyle,
                fontSize: fontSize,
                fontWeight: fontweight,
                position: {x:0,y:0},
                effects: [
                          {
                              type: 'effect',
                              effect: 'outline',
                              thickness: 20, // Adjust the intensity of the neon effect
                              color: fontcolor, // Neon color (green in this example)
                          },
                          ]
            });

      } finally {
        setIsLoading(false);
      }
    }, [state]);
    async function main() {
       // const openai = new Openai({ apiKey: OPEN_APP_ID, dangerouslyAllowBrowser: true });
      //  let OPENAIID = this.envVars.OPENAIID;
        const openai = new Openai({ apiKey: OPENAI_API_KEY });
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: "Generate a random motivational image of mime type jpeg.",
          n: 1,
          size: "1024x1024",
        });
       const image_url =  response.data[0].url;
        var blob1 = new Blob([image_url])
                    var imgg = URL.createObjectURL(blob1);
        console.log("Generative Image  imgg ==================",imgg)

        try {
            var reader = new FileReader();
            reader.readAsDataURL(blob1);
            return new Promise(resolve => {
                           reader.onloadend = function() {

                               var imtt = reader.result;

                               console.log("Generative Image==================", imtt)
                               images["imgt"].imageSrc = imtt;

                               img = images["imgt"].imageSrc;
                               console.log("Generative image========img==========",img)
                                 text = "Create your own text"
                               console.log("loading****")
                               addImage()
                           }
                       })


                   } catch (error) {
                         console.log('Error fetching the image ************:', error);
                      }


        addImage()
      //  img = image_url;

    }

  const items = Object.entries(images).map(([key, value]) => {

    var { title, imageSrc, desc } = value;

     // console.log("value ======================",img)
    return {
      key,
      title,
     
      imageSrc,
    active:
        dataUrl === imageSrc,

      onClick: () => {

          img = imageSrc;

         //  text = desc;

               setDataUrl(imageSrc);

      },
    };
  });

    const imageUpload = async(event) => {

         file = event.target.files[0];
       // images["imgt"].imageSrc = file;

        console.log("addimgwithloading before****************",imtt)
        console.log("file iiiii ****************",file)
        try {
        ////    console.log("addimgwithloading file ======",file)
          //    const imageBlob = URL.createObjectURL(file);

           // img = imageBlob;
          var reader = new FileReader();

            reader.readAsDataURL(file);

            return new Promise(resolve => {
                reader.onloadend = function() {
                    var imtt = reader.result
                    console.log("addimgwithloading==================",imtt)
                    images["imgt"].imageSrc = imtt;

                    img = images["imgt"].imageSrc;
                    console.log("addimgwithloading========img==========",img)
                    text = "Create your own text"

                }
            })
            console.log("addimgwithloading ****************",imtt)
            } catch (error) {
              console.log('Error fetching the image ************:', error);
           }

       //  img = images["imgt"].imageSrc;
      //  imtt = file;
    };



  const addImage = useCallback(async () => {
    setIsLoading(true);
      text =  await gentext(text);
      console.log("Text loading =========================",text);
    try {
        console.log("addimgwithloading+++++++++++++++",img);

       // img = images[imageId].imageSrc;
       // text = images[imageId].desc;
            const  result  = await upload({

            type: "IMAGE",
            mimeType: "image/jpeg",
            url: img,
            thumbnailUrl: img,
            });
        await addNativeElement({
        type: "SHAPE",
        paths: [
                {
                d: "M 0 0 H 1024 V 1024 H 0 L 0 0",
                fill: {
                dropTarget: true,
                asset: {
                type: "IMAGE",
                ref: result.ref,
                },
                },
                }],
        viewBox: {
         height: 1024,
         width: 1024,
         left: 0,
         top: 0,
       },
        });



        console.log("Changed font " + text)

        await addNativeElement({

                 type: "TEXT",
                 children: [text],
                 fontRef : g,
                 color: fontcolor,
                 fontStyle: fontStyle,
                 fontSize: fontSize,
                 fontWeight: fontweight,
                  position: {x:0,y:0},
                  effects: [
                             {
                              type: 'effect',
                              effect: 'outline',
                             thickness: 20, // Adjust the intensity of the neon effect
                            color: fontcolor, // Neon color (green in this example)
                           },
                         ]
             });


    } finally {
      setIsLoading(false);
    }
  }, [state]);


  return (
    <div className={baseStyles.scrollContainer}>
      <Rows spacing="2u">
        <Text value={fontSize}><b><u>
          Inspiring Images and Motivational Texts
         </u></b> </Text>

          <FormField
            label="Select an image"
            control={(props) => (
              <Box id={props.id} padding="1u">
                <Grid columns={3} spacing="1.5u">
                                 {items.map((item) => (
                                                       <ImageCard
                                                       ariaLabel={item.title}
                                                       key={item.key}
                                                       text={item.desc}
                                                       thumbnailUrl={item.imageSrc}
                                                       onClick={item.onClick}
                                                       selectable={true}
                                                       selected={item.active}
                                                       borderRadius="standard"
                                                       />

                                                       ))

                                 }
                </Grid>
              </Box>
            )}
          />




          <Button variant="primary"  text={text} disabled={disabled} loading={isLoading} onClick={(addImage)}>

             Add element
           </Button>
  
          <Text><b>Input an Image
          </b></Text>
          <input type='file' accept='image/jpeg' onChange={(imageUpload)}></input>
          <Button variant="primary" disabled={disabled} loading={isLoading} imageSrc={imtt} onClick={(addImage)}>

             Add Image
           </Button>       
          <Text><b> Generate a motivational text </b></Text>
          <Button variant="primary" disabled={disabled} loading={isLoading} onClick={(main1)}>

         Generate
       </Button>

          <Text>Select a Font: <b> {g1} </b> </Text>
          <Button label="Select a Font {g1}"  value={g} variant="primary"  onChange={(value) => {
              return {
              g: handleFont(),
              };
          }} onClick={(handleFont)} >

          Update
           </Button>

          <Text> Current font '{g1}' + Size {fontSize}</Text>



          <Text label="Enter a Font Weight">
          </Text>
          <FormField label="Font Weight" value={fontweight}
          control={(props) => (
                               <Select <TextAttributes["fontWeight"]> value={fontweight}
                               {...props}
                               stretch
                               onChange={(Weight) => {
                                   console.log("The value is=========",Weight);
                                   fontweight = Weight;
                                   return {

                                       fontweight : Weight,
                                   };
                               }}
                               options = {[
                                   {value: "normal", lablel: "Normal" },
                                   {value: "thin", lablel: "Thin" },
                                   {value:"light", lablel: "Light" },
                                   { value:"semibold", label: "Semibold"},
                                   { value: "bold", label: "Bold"},
                                   { value: "ultrabold", label: "Ultrabold"},
                                   { value: "heavy", label: "Heavy"},
                               ]}

                               />
                               )}
        />

          <Text label="Font Style">
          </Text>
          <FormField label="Font Style" value={fontStyle}
          control={(props) => (
                               <Select <TextAttributes["fontStyle"]> value={fontStyle}
                               {...props}
                               stretch
                               onChange={(Style) => {
                                   console.log("The value is=========",Style);
                                   fontStyle = Style;
                                   return {

                                       fontStyle : Style,
                                   };
                               }}
                               options = {[
                                   {value: "normal", lablel: "Normal" },
                                   {value: "italic", lablel: "Italic" },

                               ]}

                               />
                               )}
        />
          <Text label="Enter a Font Size">
          </Text>
          <FormField label="Font Size" value={fontSize}
          control={(props) => (
                               <Select <TextAttributes["fontSize"]> value={fontSize}
                               {...props}
                               stretch
                               onChange={(Size) => {
                                   console.log("The value is=========",Size);
                                   fontSize = Size;
                                   return {

                                       fontSize : Size,
                                   };
                               }}
                               options = {[
                                   {value: 10.0, lablel: "20" },
                                   {value: 30.0, lablel: "30" },
                                   { value: 40.0, label: "40"},
                                   { value: 60.0, label: "60"},
                                   { value: 80.0, label: "80"},
                                   { value: 100.0, label: "100"},
                               ]}

                               />
                               )}
        />

          <Text><b>Select a Font Color</b>
          </Text>
          <Swatch
           fill={[color]}

            onClick={async (event) => {
              const anchor = event.currentTarget.getBoundingClientRect();
              await openColorSelector(anchor, {
                scopes: ["solid"],
              onColorSelect: (event) => {
                //  if (event.selection.type === "solid") {
                  fontcolor = event.selection.hexString;
                  console.log("event=======================",event.selection.hexString)
                  setColor(event.selection.hexString);

                      console.log("color=======================",fontcolor,color)
                //  }

                },
              });
            }}
          />


      </Rows>



    </div>



  );

};
