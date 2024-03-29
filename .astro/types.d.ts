declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S | ((context: SchemaContext) => S);
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	const entryMap: {
		"work": {
"Automate-Your-Web-Server-Deployment.md": {
  id: "Automate-Your-Web-Server-Deployment.md",
  slug: "automate-your-web-server-deployment",
  body: string,
  collection: "work",
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] },
"Creating-an-EKS-Cluster-and-Deploying-a-Multi-Container-WebApp.md": {
	id: "Creating-an-EKS-Cluster-and-Deploying-a-Multi-Container-WebApp.md",
	slug: "Creating-an-EKS-Cluster-and-Deploying-a-Multi-Container-WebApp",
	body: string,
	collection: "work",
	data: InferEntrySchema<"work">
  } & { render(): Render[".md"] },
"Containerizing-a-Multi-Container-Web-Application.md": {
  id: "Containerizing-a-Multi-Container-Web-Application.md",
  slug: "containerizing-a-multi-container-web-application",
  body: string,
  collection: "work",
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] },
"Creating-an-EKS-Cluster-and-Deploying-a-Multi-Container-WebApp.md": {
  id: "Creating-an-EKS-Cluster-and-Deploying-a-Multi-Container-WebApp.md",
  slug: "creating-an-eks-cluster-and-deploying-a-multi-container-webapp",
  body: string,
  collection: "work",
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] },
"From-Zero-to-Cloud-in-15-Seconds.md": {
  id: "From-Zero-to-Cloud-in-15-Seconds.md",
  slug: "from-zero-to-cloud-in-15-seconds",
  body: string,
  collection: "work",
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] },
"Scoring-with-the-Cloud.md": {
  id: "Scoring-with-the-Cloud.md",
  slug: "scoring-with-the-cloud",
  body: string,
  collection: "work",
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] },
"nested/Git-Basics-Shell-Scripting.md": {
  id: "nested/Git-Basics-Shell-Scripting.md",
  slug: "nested/git-basics-shell-scripting",
  body: string,
  collection: "work",
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
