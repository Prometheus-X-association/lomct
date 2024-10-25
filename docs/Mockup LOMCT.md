# Mock-up LOMCT

## How have we carried out the mock-up for our building block 'LOMCT'?

The following document is designed to show the process through which Inokufu created the mock-up for the Building Block *Learning Object Metadata Crowd Tagging* (LOMCT).

The data push related to this mock-up aims to simulate the transfer of data from this Chrome extension, LOMCT, to the learning record store of an organization that has acquired the service linked with this building block.

To elaborate, LOMCT is a Chrome extension that allows an organization, whether it be an educational institution or an edtech company, to enrich the metadata of the learning objects used by its members, both for teaching and learning purposes. More specifically, users can review the learning objects by assigning them a score between 0 to 5 stars and providing a brief text where they enrich their rating with a comment.

Additionally, they can make suggestions to the authority to modify the information attached to a learning object, such as:
- the language of the material,
- the type of learning object (video, article, podcast, etc.),
- its duration,
- the educational level it is relevant for,
- keywords,
- and other parameters.
![mockup lomct a](https://github.com/user-attachments/assets/b45c5f6e-08e8-40f5-b4aa-900b59824ca2)

Once these actions are completed by users, an xAPI statement is generated for each review or edit proposal and then sent to the organization's LRS. It is precisely this communication between the Chrome extension and the LRS that was intended to be reproduced or simulated in this mock-up.

## How to Configure the Learning Records Store?

To execute the mock-up, a store was created in the Learning Records Store **Learning Locker**, named *Mockup LOMCT*, with two clients:
- One to receive data from the BB in question - **Mockup LOMCT Read**
- Another to send data - **Mockup LOMCT Write**

For configuring both clients, as seen in the following screenshot, we set up one of them to be able to receive xAPI statements by setting it to "Read all" and linking it with the store *Mockup LOMCT*.

Once that client was created, we proceeded to create the other client through which we will send xAPI statements. We selected **"Write statements (must be used with a read scope)"** and linked it as well with the store *Mockup LOMCT*.

It should be noted that the **'key'** and **'secret'** are necessary credentials to connect the clients of a store with the endpoint it will communicate with. In this case, the endpoint would be the extension account of the organization that is the protagonist of this data push from LOMCT to its LRS. We can access these credentials by navigating to the settings section, then to *clients*, and finally selecting the client for which we want to retrieve the key and the secret.

Furthermore, if they require our read or write keys, they should contact us. Our emails can be found at the bottom of this document.

## Nature of the Data That Have Been Sent

The data push has already been triggered, and we received 14 xAPI statements. These records pertain to **reviews** and **metadata edit proposals** made by users. Considering the functionalities of this building block:

- Statements with the xAPI verb **'Reviewed'** simulate a review made by a user.
- Statements with the verb **'Proposed'** describe a metadata edit proposal made by a user using the extension.

  ![mockup lomct b](https://github.com/user-attachments/assets/8bc9f7f8-961b-42e5-a6c6-b65067113438)

### Example of a Particular xAPI Statement Received by the Mockup LOMCT Store

We will use the following xAPI statements received in the store corresponding to the *LOMCT mockup* as an example to demonstrate how this mockup addresses educational needs.

![mockup lomct c](https://github.com/user-attachments/assets/265f5b9c-0ea8-40e9-b0fa-3e46d3af828d)


The following two statements correspond to the review and edit proposal made by a user through the extension:

- **The first statement** reflects a review of **⅘ stars** made by the user *Baden-Powell* for the learning object: [https://en.wikipedia.org/wiki/Robert_Baden-Powell,_1st_Baron_Baden-Powell](https://en.wikipedia.org/wiki/Robert_Baden-Powell,_1st_Baron_Baden-Powell).  
  Additionally, as a mandatory field, he attached a comment:  
  > "Overall very interesting. What's missing is a section on how he came to scouting."

- **The second statement** pertains to the **metadata edit proposal** made by the same user for the same learning object, suggesting a **Bloom's Taxonomy verb**: *discover*, and a **provider**: *Wikipedia*.

From a pedagogical perspective, the **review** and **metadata edit proposals** allow both learners and trainers to rate and share their insights on the materials they use to teach or learn. This enriches the information attached to those objects, improving their discoverability and quality. 

In this case, the statements also highlight the user’s profession—*“biography: Scouting expert”*—which provides insight into who is making the review or edit proposal and their reasoning.  
In other words, if another user is looking for material to introduce or discover a certain topic, that learning object already contains valuable information for both teaching and learning, readily accessible to other users of the extension.



### 1. Statement for a Review by User Baden-Powell
*Statement:*  
**Baden-Powell** `http://id.tincanapi.com/verb/reviewed` **https://en.wikipedia.org/wiki/Robert_Baden-Powell,_1st_Baron_Baden-Powell**

```json
{
  "authority": {
    "objectType": "Agent",
    "name": "Mockup LOMCT write",
    "mbox": "mailto:contact@inokufu.com"
  },
  "timestamp": "2024-04-10T14:17:43.686Z",
  "version": "1.0.0",
  "context": {
    "extensions": {
      "http://schema.prometheus-x.org/extension/username": "Baden-Powell",
      "http://schema.prometheus-x.org/extension/biography": "Scouting expert"
    },
    "language": "en"
  },
  "actor": {
    "name": "Baden-Powell",
    "mbox": "mailto:lauriane.marxer+lomct2@inokufu.com",
    "objectType": "Agent"
  },
  "verb": {
    "id": "http://id.tincanapi.com/verb/reviewed"
  },
  "object": {
    "id": "https://en.wikipedia.org/wiki/Robert_Baden-Powell,_1st_Baron_Baden-Powell"
  },
  "result": {
    "score": {
      "scaled": 1.0,
      "raw": 4,
      "min": 0,
      "max": 5
    },
    "response": "Overall very interesting. What's missing is a section on how he came to scouting."
  }
}

```

**2. Statement for an Edit Proposal Made by User "Baden-Powell**



**Statement:**  

**Baden-Powell** `http://id.tincanapi.com/verb/reviewed` **https://en.wikipedia.org/wiki/Robert_Baden-Powell,_1st_Baron_Baden-Powell**



```json

{

  "authority": {

    "objectType": "Agent",

    "name": "Mockup LOMCT write",

    "mbox": "mailto:contact@inokufu.com"

  },

  "timestamp": "2024-09-03T14:17:43.686Z",

  "context": {

    "extensions": {

      "http://schema.prometheus-x.org/extension/username": "Baden-Powell",

      "http://schema.prometheus-x.org/extension/biography": "Scouting expert",

      "http://schema.prometheus-x.org/extension/bloom": "discover",

      "http://schema.prometheus-x.org/extension/provider": "wikipedia"

    },

    "language": "en"

  },

  "actor": {

    "name": "Baden-Powell",

    "mbox": "mailto:lauriane.marxer+lomct2@inokufu.com",

    "objectType": "Agent"

  },

  "version": "1.0.0",

  "id": "8f5e30f6-312e-4ec6-bc60-a37bcb1811ed",

  "verb": {

    "id": "https://w3id.org/xapi/dod-isd/verbs/proposed",

    "display": {

      "en-US": "proposed"

    }

  },

  "object": {

    "id": "https://en.wikipedia.org/wiki/Robert_Baden-Powell,_1st_Baron_Baden-Powell",

    "definition": {

      "name": {

        "en": "Robert Baden-Powell"

      }

    },

    "objectType": "Activity"

  }

}

```



## Use Cases



We can consider two scenarios in which a company could receive or send statements like the ones we have shown above:



1. **Edtech Company Sharing Reviews and Metadata Edits**  

   An edtech company that wants to share reviews and information (or edit proposals) about learning objects created by its users with other organizations via the dataspace. The statements to be sent must adhere to the xAPI format.



2. **Educational Institution Receiving Feedback in xAPI Format**  

   Similarly, another edtech company or educational institution seeks to allow its members to provide feedback on the learning objects they use, receiving the corresponding statements in xAPI format for reviews and edit proposals in their Learning Record Store (LRS).



## Contact



If you are interested in obtaining a read or write key, contact us directly. Send us your use case, the type of your data, the number of traces you want to send or receive, and what kind of trace you need.



- **Sebastian:** [sebastian.utard@inokufu.com](mailto:sebastian.utard@inokufu.com)

- **Lauriane:** [lauriane.marxer@inokufu.com](mailto:lauriane.marxer@inokufu.com)

```
