
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model PraiseSubmission
 * 
 */
export type PraiseSubmission = $Result.DefaultSelection<Prisma.$PraiseSubmissionPayload>
/**
 * Model GardenTip
 * Community advice for nurturing connections ("Watering the garden")
 */
export type GardenTip = $Result.DefaultSelection<Prisma.$GardenTipPayload>
/**
 * Model OathTaking
 * Someone who has spoken an Honor oath aloud and recorded their name
 */
export type OathTaking = $Result.DefaultSelection<Prisma.$OathTakingPayload>
/**
 * Model GroupStorySentence
 * Collaborative Paragon group story — one sentence per contribution
 */
export type GroupStorySentence = $Result.DefaultSelection<Prisma.$GroupStorySentencePayload>
/**
 * Model GroupStoryChatMessage
 * Freeform chat beside the group story
 */
export type GroupStoryChatMessage = $Result.DefaultSelection<Prisma.$GroupStoryChatMessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PraiseKind: {
  MESSAGE: 'MESSAGE',
  AUDIO: 'AUDIO',
  DRAWING: 'DRAWING'
};

export type PraiseKind = (typeof PraiseKind)[keyof typeof PraiseKind]

}

export type PraiseKind = $Enums.PraiseKind

export const PraiseKind: typeof $Enums.PraiseKind

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Posts
 * const posts = await prisma.post.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Posts
   * const posts = await prisma.post.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.praiseSubmission`: Exposes CRUD operations for the **PraiseSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PraiseSubmissions
    * const praiseSubmissions = await prisma.praiseSubmission.findMany()
    * ```
    */
  get praiseSubmission(): Prisma.PraiseSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gardenTip`: Exposes CRUD operations for the **GardenTip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GardenTips
    * const gardenTips = await prisma.gardenTip.findMany()
    * ```
    */
  get gardenTip(): Prisma.GardenTipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oathTaking`: Exposes CRUD operations for the **OathTaking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OathTakings
    * const oathTakings = await prisma.oathTaking.findMany()
    * ```
    */
  get oathTaking(): Prisma.OathTakingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupStorySentence`: Exposes CRUD operations for the **GroupStorySentence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupStorySentences
    * const groupStorySentences = await prisma.groupStorySentence.findMany()
    * ```
    */
  get groupStorySentence(): Prisma.GroupStorySentenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupStoryChatMessage`: Exposes CRUD operations for the **GroupStoryChatMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupStoryChatMessages
    * const groupStoryChatMessages = await prisma.groupStoryChatMessage.findMany()
    * ```
    */
  get groupStoryChatMessage(): Prisma.GroupStoryChatMessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Post: 'Post',
    PraiseSubmission: 'PraiseSubmission',
    GardenTip: 'GardenTip',
    OathTaking: 'OathTaking',
    GroupStorySentence: 'GroupStorySentence',
    GroupStoryChatMessage: 'GroupStoryChatMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "post" | "praiseSubmission" | "gardenTip" | "oathTaking" | "groupStorySentence" | "groupStoryChatMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      PraiseSubmission: {
        payload: Prisma.$PraiseSubmissionPayload<ExtArgs>
        fields: Prisma.PraiseSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PraiseSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PraiseSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload>
          }
          findFirst: {
            args: Prisma.PraiseSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PraiseSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload>
          }
          findMany: {
            args: Prisma.PraiseSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload>[]
          }
          create: {
            args: Prisma.PraiseSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload>
          }
          createMany: {
            args: Prisma.PraiseSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PraiseSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload>[]
          }
          delete: {
            args: Prisma.PraiseSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload>
          }
          update: {
            args: Prisma.PraiseSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.PraiseSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PraiseSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PraiseSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.PraiseSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PraiseSubmissionPayload>
          }
          aggregate: {
            args: Prisma.PraiseSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePraiseSubmission>
          }
          groupBy: {
            args: Prisma.PraiseSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PraiseSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PraiseSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<PraiseSubmissionCountAggregateOutputType> | number
          }
        }
      }
      GardenTip: {
        payload: Prisma.$GardenTipPayload<ExtArgs>
        fields: Prisma.GardenTipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GardenTipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GardenTipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload>
          }
          findFirst: {
            args: Prisma.GardenTipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GardenTipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload>
          }
          findMany: {
            args: Prisma.GardenTipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload>[]
          }
          create: {
            args: Prisma.GardenTipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload>
          }
          createMany: {
            args: Prisma.GardenTipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GardenTipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload>[]
          }
          delete: {
            args: Prisma.GardenTipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload>
          }
          update: {
            args: Prisma.GardenTipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload>
          }
          deleteMany: {
            args: Prisma.GardenTipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GardenTipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GardenTipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload>[]
          }
          upsert: {
            args: Prisma.GardenTipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GardenTipPayload>
          }
          aggregate: {
            args: Prisma.GardenTipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGardenTip>
          }
          groupBy: {
            args: Prisma.GardenTipGroupByArgs<ExtArgs>
            result: $Utils.Optional<GardenTipGroupByOutputType>[]
          }
          count: {
            args: Prisma.GardenTipCountArgs<ExtArgs>
            result: $Utils.Optional<GardenTipCountAggregateOutputType> | number
          }
        }
      }
      OathTaking: {
        payload: Prisma.$OathTakingPayload<ExtArgs>
        fields: Prisma.OathTakingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OathTakingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OathTakingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload>
          }
          findFirst: {
            args: Prisma.OathTakingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OathTakingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload>
          }
          findMany: {
            args: Prisma.OathTakingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload>[]
          }
          create: {
            args: Prisma.OathTakingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload>
          }
          createMany: {
            args: Prisma.OathTakingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OathTakingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload>[]
          }
          delete: {
            args: Prisma.OathTakingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload>
          }
          update: {
            args: Prisma.OathTakingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload>
          }
          deleteMany: {
            args: Prisma.OathTakingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OathTakingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OathTakingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload>[]
          }
          upsert: {
            args: Prisma.OathTakingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OathTakingPayload>
          }
          aggregate: {
            args: Prisma.OathTakingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOathTaking>
          }
          groupBy: {
            args: Prisma.OathTakingGroupByArgs<ExtArgs>
            result: $Utils.Optional<OathTakingGroupByOutputType>[]
          }
          count: {
            args: Prisma.OathTakingCountArgs<ExtArgs>
            result: $Utils.Optional<OathTakingCountAggregateOutputType> | number
          }
        }
      }
      GroupStorySentence: {
        payload: Prisma.$GroupStorySentencePayload<ExtArgs>
        fields: Prisma.GroupStorySentenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupStorySentenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupStorySentenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload>
          }
          findFirst: {
            args: Prisma.GroupStorySentenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupStorySentenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload>
          }
          findMany: {
            args: Prisma.GroupStorySentenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload>[]
          }
          create: {
            args: Prisma.GroupStorySentenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload>
          }
          createMany: {
            args: Prisma.GroupStorySentenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupStorySentenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload>[]
          }
          delete: {
            args: Prisma.GroupStorySentenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload>
          }
          update: {
            args: Prisma.GroupStorySentenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload>
          }
          deleteMany: {
            args: Prisma.GroupStorySentenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupStorySentenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupStorySentenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload>[]
          }
          upsert: {
            args: Prisma.GroupStorySentenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStorySentencePayload>
          }
          aggregate: {
            args: Prisma.GroupStorySentenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupStorySentence>
          }
          groupBy: {
            args: Prisma.GroupStorySentenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupStorySentenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupStorySentenceCountArgs<ExtArgs>
            result: $Utils.Optional<GroupStorySentenceCountAggregateOutputType> | number
          }
        }
      }
      GroupStoryChatMessage: {
        payload: Prisma.$GroupStoryChatMessagePayload<ExtArgs>
        fields: Prisma.GroupStoryChatMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupStoryChatMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupStoryChatMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload>
          }
          findFirst: {
            args: Prisma.GroupStoryChatMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupStoryChatMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload>
          }
          findMany: {
            args: Prisma.GroupStoryChatMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload>[]
          }
          create: {
            args: Prisma.GroupStoryChatMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload>
          }
          createMany: {
            args: Prisma.GroupStoryChatMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupStoryChatMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload>[]
          }
          delete: {
            args: Prisma.GroupStoryChatMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload>
          }
          update: {
            args: Prisma.GroupStoryChatMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload>
          }
          deleteMany: {
            args: Prisma.GroupStoryChatMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupStoryChatMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupStoryChatMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload>[]
          }
          upsert: {
            args: Prisma.GroupStoryChatMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupStoryChatMessagePayload>
          }
          aggregate: {
            args: Prisma.GroupStoryChatMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupStoryChatMessage>
          }
          groupBy: {
            args: Prisma.GroupStoryChatMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupStoryChatMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupStoryChatMessageCountArgs<ExtArgs>
            result: $Utils.Optional<GroupStoryChatMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    post?: PostOmit
    praiseSubmission?: PraiseSubmissionOmit
    gardenTip?: GardenTipOmit
    oathTaking?: OathTakingOmit
    groupStorySentence?: GroupStorySentenceOmit
    groupStoryChatMessage?: GroupStoryChatMessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["post"]>

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'Int'>
    readonly name: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
  }


  /**
   * Model PraiseSubmission
   */

  export type AggregatePraiseSubmission = {
    _count: PraiseSubmissionCountAggregateOutputType | null
    _min: PraiseSubmissionMinAggregateOutputType | null
    _max: PraiseSubmissionMaxAggregateOutputType | null
  }

  export type PraiseSubmissionMinAggregateOutputType = {
    id: string | null
    kind: $Enums.PraiseKind | null
    message: string | null
    fromName: string | null
    mediaData: string | null
    createdAt: Date | null
  }

  export type PraiseSubmissionMaxAggregateOutputType = {
    id: string | null
    kind: $Enums.PraiseKind | null
    message: string | null
    fromName: string | null
    mediaData: string | null
    createdAt: Date | null
  }

  export type PraiseSubmissionCountAggregateOutputType = {
    id: number
    kind: number
    message: number
    fromName: number
    mediaData: number
    createdAt: number
    _all: number
  }


  export type PraiseSubmissionMinAggregateInputType = {
    id?: true
    kind?: true
    message?: true
    fromName?: true
    mediaData?: true
    createdAt?: true
  }

  export type PraiseSubmissionMaxAggregateInputType = {
    id?: true
    kind?: true
    message?: true
    fromName?: true
    mediaData?: true
    createdAt?: true
  }

  export type PraiseSubmissionCountAggregateInputType = {
    id?: true
    kind?: true
    message?: true
    fromName?: true
    mediaData?: true
    createdAt?: true
    _all?: true
  }

  export type PraiseSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PraiseSubmission to aggregate.
     */
    where?: PraiseSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PraiseSubmissions to fetch.
     */
    orderBy?: PraiseSubmissionOrderByWithRelationInput | PraiseSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PraiseSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PraiseSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PraiseSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PraiseSubmissions
    **/
    _count?: true | PraiseSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PraiseSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PraiseSubmissionMaxAggregateInputType
  }

  export type GetPraiseSubmissionAggregateType<T extends PraiseSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregatePraiseSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePraiseSubmission[P]>
      : GetScalarType<T[P], AggregatePraiseSubmission[P]>
  }




  export type PraiseSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PraiseSubmissionWhereInput
    orderBy?: PraiseSubmissionOrderByWithAggregationInput | PraiseSubmissionOrderByWithAggregationInput[]
    by: PraiseSubmissionScalarFieldEnum[] | PraiseSubmissionScalarFieldEnum
    having?: PraiseSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PraiseSubmissionCountAggregateInputType | true
    _min?: PraiseSubmissionMinAggregateInputType
    _max?: PraiseSubmissionMaxAggregateInputType
  }

  export type PraiseSubmissionGroupByOutputType = {
    id: string
    kind: $Enums.PraiseKind
    message: string | null
    fromName: string | null
    mediaData: string | null
    createdAt: Date
    _count: PraiseSubmissionCountAggregateOutputType | null
    _min: PraiseSubmissionMinAggregateOutputType | null
    _max: PraiseSubmissionMaxAggregateOutputType | null
  }

  type GetPraiseSubmissionGroupByPayload<T extends PraiseSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PraiseSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PraiseSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PraiseSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], PraiseSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type PraiseSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kind?: boolean
    message?: boolean
    fromName?: boolean
    mediaData?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["praiseSubmission"]>

  export type PraiseSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kind?: boolean
    message?: boolean
    fromName?: boolean
    mediaData?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["praiseSubmission"]>

  export type PraiseSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kind?: boolean
    message?: boolean
    fromName?: boolean
    mediaData?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["praiseSubmission"]>

  export type PraiseSubmissionSelectScalar = {
    id?: boolean
    kind?: boolean
    message?: boolean
    fromName?: boolean
    mediaData?: boolean
    createdAt?: boolean
  }

  export type PraiseSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "kind" | "message" | "fromName" | "mediaData" | "createdAt", ExtArgs["result"]["praiseSubmission"]>

  export type $PraiseSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PraiseSubmission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kind: $Enums.PraiseKind
      /**
       * Admiration text, or optional note for audio/drawing
       */
      message: string | null
      /**
       * Optional signer name
       */
      fromName: string | null
      /**
       * data URL for audio (webm/ogg) or drawing (png)
       */
      mediaData: string | null
      createdAt: Date
    }, ExtArgs["result"]["praiseSubmission"]>
    composites: {}
  }

  type PraiseSubmissionGetPayload<S extends boolean | null | undefined | PraiseSubmissionDefaultArgs> = $Result.GetResult<Prisma.$PraiseSubmissionPayload, S>

  type PraiseSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PraiseSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PraiseSubmissionCountAggregateInputType | true
    }

  export interface PraiseSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PraiseSubmission'], meta: { name: 'PraiseSubmission' } }
    /**
     * Find zero or one PraiseSubmission that matches the filter.
     * @param {PraiseSubmissionFindUniqueArgs} args - Arguments to find a PraiseSubmission
     * @example
     * // Get one PraiseSubmission
     * const praiseSubmission = await prisma.praiseSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PraiseSubmissionFindUniqueArgs>(args: SelectSubset<T, PraiseSubmissionFindUniqueArgs<ExtArgs>>): Prisma__PraiseSubmissionClient<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PraiseSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PraiseSubmissionFindUniqueOrThrowArgs} args - Arguments to find a PraiseSubmission
     * @example
     * // Get one PraiseSubmission
     * const praiseSubmission = await prisma.praiseSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PraiseSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, PraiseSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PraiseSubmissionClient<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PraiseSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PraiseSubmissionFindFirstArgs} args - Arguments to find a PraiseSubmission
     * @example
     * // Get one PraiseSubmission
     * const praiseSubmission = await prisma.praiseSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PraiseSubmissionFindFirstArgs>(args?: SelectSubset<T, PraiseSubmissionFindFirstArgs<ExtArgs>>): Prisma__PraiseSubmissionClient<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PraiseSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PraiseSubmissionFindFirstOrThrowArgs} args - Arguments to find a PraiseSubmission
     * @example
     * // Get one PraiseSubmission
     * const praiseSubmission = await prisma.praiseSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PraiseSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, PraiseSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PraiseSubmissionClient<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PraiseSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PraiseSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PraiseSubmissions
     * const praiseSubmissions = await prisma.praiseSubmission.findMany()
     * 
     * // Get first 10 PraiseSubmissions
     * const praiseSubmissions = await prisma.praiseSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const praiseSubmissionWithIdOnly = await prisma.praiseSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PraiseSubmissionFindManyArgs>(args?: SelectSubset<T, PraiseSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PraiseSubmission.
     * @param {PraiseSubmissionCreateArgs} args - Arguments to create a PraiseSubmission.
     * @example
     * // Create one PraiseSubmission
     * const PraiseSubmission = await prisma.praiseSubmission.create({
     *   data: {
     *     // ... data to create a PraiseSubmission
     *   }
     * })
     * 
     */
    create<T extends PraiseSubmissionCreateArgs>(args: SelectSubset<T, PraiseSubmissionCreateArgs<ExtArgs>>): Prisma__PraiseSubmissionClient<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PraiseSubmissions.
     * @param {PraiseSubmissionCreateManyArgs} args - Arguments to create many PraiseSubmissions.
     * @example
     * // Create many PraiseSubmissions
     * const praiseSubmission = await prisma.praiseSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PraiseSubmissionCreateManyArgs>(args?: SelectSubset<T, PraiseSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PraiseSubmissions and returns the data saved in the database.
     * @param {PraiseSubmissionCreateManyAndReturnArgs} args - Arguments to create many PraiseSubmissions.
     * @example
     * // Create many PraiseSubmissions
     * const praiseSubmission = await prisma.praiseSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PraiseSubmissions and only return the `id`
     * const praiseSubmissionWithIdOnly = await prisma.praiseSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PraiseSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, PraiseSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PraiseSubmission.
     * @param {PraiseSubmissionDeleteArgs} args - Arguments to delete one PraiseSubmission.
     * @example
     * // Delete one PraiseSubmission
     * const PraiseSubmission = await prisma.praiseSubmission.delete({
     *   where: {
     *     // ... filter to delete one PraiseSubmission
     *   }
     * })
     * 
     */
    delete<T extends PraiseSubmissionDeleteArgs>(args: SelectSubset<T, PraiseSubmissionDeleteArgs<ExtArgs>>): Prisma__PraiseSubmissionClient<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PraiseSubmission.
     * @param {PraiseSubmissionUpdateArgs} args - Arguments to update one PraiseSubmission.
     * @example
     * // Update one PraiseSubmission
     * const praiseSubmission = await prisma.praiseSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PraiseSubmissionUpdateArgs>(args: SelectSubset<T, PraiseSubmissionUpdateArgs<ExtArgs>>): Prisma__PraiseSubmissionClient<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PraiseSubmissions.
     * @param {PraiseSubmissionDeleteManyArgs} args - Arguments to filter PraiseSubmissions to delete.
     * @example
     * // Delete a few PraiseSubmissions
     * const { count } = await prisma.praiseSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PraiseSubmissionDeleteManyArgs>(args?: SelectSubset<T, PraiseSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PraiseSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PraiseSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PraiseSubmissions
     * const praiseSubmission = await prisma.praiseSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PraiseSubmissionUpdateManyArgs>(args: SelectSubset<T, PraiseSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PraiseSubmissions and returns the data updated in the database.
     * @param {PraiseSubmissionUpdateManyAndReturnArgs} args - Arguments to update many PraiseSubmissions.
     * @example
     * // Update many PraiseSubmissions
     * const praiseSubmission = await prisma.praiseSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PraiseSubmissions and only return the `id`
     * const praiseSubmissionWithIdOnly = await prisma.praiseSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PraiseSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, PraiseSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PraiseSubmission.
     * @param {PraiseSubmissionUpsertArgs} args - Arguments to update or create a PraiseSubmission.
     * @example
     * // Update or create a PraiseSubmission
     * const praiseSubmission = await prisma.praiseSubmission.upsert({
     *   create: {
     *     // ... data to create a PraiseSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PraiseSubmission we want to update
     *   }
     * })
     */
    upsert<T extends PraiseSubmissionUpsertArgs>(args: SelectSubset<T, PraiseSubmissionUpsertArgs<ExtArgs>>): Prisma__PraiseSubmissionClient<$Result.GetResult<Prisma.$PraiseSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PraiseSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PraiseSubmissionCountArgs} args - Arguments to filter PraiseSubmissions to count.
     * @example
     * // Count the number of PraiseSubmissions
     * const count = await prisma.praiseSubmission.count({
     *   where: {
     *     // ... the filter for the PraiseSubmissions we want to count
     *   }
     * })
    **/
    count<T extends PraiseSubmissionCountArgs>(
      args?: Subset<T, PraiseSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PraiseSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PraiseSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PraiseSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PraiseSubmissionAggregateArgs>(args: Subset<T, PraiseSubmissionAggregateArgs>): Prisma.PrismaPromise<GetPraiseSubmissionAggregateType<T>>

    /**
     * Group by PraiseSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PraiseSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PraiseSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PraiseSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: PraiseSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PraiseSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPraiseSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PraiseSubmission model
   */
  readonly fields: PraiseSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PraiseSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PraiseSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PraiseSubmission model
   */
  interface PraiseSubmissionFieldRefs {
    readonly id: FieldRef<"PraiseSubmission", 'String'>
    readonly kind: FieldRef<"PraiseSubmission", 'PraiseKind'>
    readonly message: FieldRef<"PraiseSubmission", 'String'>
    readonly fromName: FieldRef<"PraiseSubmission", 'String'>
    readonly mediaData: FieldRef<"PraiseSubmission", 'String'>
    readonly createdAt: FieldRef<"PraiseSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PraiseSubmission findUnique
   */
  export type PraiseSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which PraiseSubmission to fetch.
     */
    where: PraiseSubmissionWhereUniqueInput
  }

  /**
   * PraiseSubmission findUniqueOrThrow
   */
  export type PraiseSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which PraiseSubmission to fetch.
     */
    where: PraiseSubmissionWhereUniqueInput
  }

  /**
   * PraiseSubmission findFirst
   */
  export type PraiseSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which PraiseSubmission to fetch.
     */
    where?: PraiseSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PraiseSubmissions to fetch.
     */
    orderBy?: PraiseSubmissionOrderByWithRelationInput | PraiseSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PraiseSubmissions.
     */
    cursor?: PraiseSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PraiseSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PraiseSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PraiseSubmissions.
     */
    distinct?: PraiseSubmissionScalarFieldEnum | PraiseSubmissionScalarFieldEnum[]
  }

  /**
   * PraiseSubmission findFirstOrThrow
   */
  export type PraiseSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which PraiseSubmission to fetch.
     */
    where?: PraiseSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PraiseSubmissions to fetch.
     */
    orderBy?: PraiseSubmissionOrderByWithRelationInput | PraiseSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PraiseSubmissions.
     */
    cursor?: PraiseSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PraiseSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PraiseSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PraiseSubmissions.
     */
    distinct?: PraiseSubmissionScalarFieldEnum | PraiseSubmissionScalarFieldEnum[]
  }

  /**
   * PraiseSubmission findMany
   */
  export type PraiseSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which PraiseSubmissions to fetch.
     */
    where?: PraiseSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PraiseSubmissions to fetch.
     */
    orderBy?: PraiseSubmissionOrderByWithRelationInput | PraiseSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PraiseSubmissions.
     */
    cursor?: PraiseSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PraiseSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PraiseSubmissions.
     */
    skip?: number
    distinct?: PraiseSubmissionScalarFieldEnum | PraiseSubmissionScalarFieldEnum[]
  }

  /**
   * PraiseSubmission create
   */
  export type PraiseSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to create a PraiseSubmission.
     */
    data: XOR<PraiseSubmissionCreateInput, PraiseSubmissionUncheckedCreateInput>
  }

  /**
   * PraiseSubmission createMany
   */
  export type PraiseSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PraiseSubmissions.
     */
    data: PraiseSubmissionCreateManyInput | PraiseSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PraiseSubmission createManyAndReturn
   */
  export type PraiseSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many PraiseSubmissions.
     */
    data: PraiseSubmissionCreateManyInput | PraiseSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PraiseSubmission update
   */
  export type PraiseSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to update a PraiseSubmission.
     */
    data: XOR<PraiseSubmissionUpdateInput, PraiseSubmissionUncheckedUpdateInput>
    /**
     * Choose, which PraiseSubmission to update.
     */
    where: PraiseSubmissionWhereUniqueInput
  }

  /**
   * PraiseSubmission updateMany
   */
  export type PraiseSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PraiseSubmissions.
     */
    data: XOR<PraiseSubmissionUpdateManyMutationInput, PraiseSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which PraiseSubmissions to update
     */
    where?: PraiseSubmissionWhereInput
    /**
     * Limit how many PraiseSubmissions to update.
     */
    limit?: number
  }

  /**
   * PraiseSubmission updateManyAndReturn
   */
  export type PraiseSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update PraiseSubmissions.
     */
    data: XOR<PraiseSubmissionUpdateManyMutationInput, PraiseSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which PraiseSubmissions to update
     */
    where?: PraiseSubmissionWhereInput
    /**
     * Limit how many PraiseSubmissions to update.
     */
    limit?: number
  }

  /**
   * PraiseSubmission upsert
   */
  export type PraiseSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * The filter to search for the PraiseSubmission to update in case it exists.
     */
    where: PraiseSubmissionWhereUniqueInput
    /**
     * In case the PraiseSubmission found by the `where` argument doesn't exist, create a new PraiseSubmission with this data.
     */
    create: XOR<PraiseSubmissionCreateInput, PraiseSubmissionUncheckedCreateInput>
    /**
     * In case the PraiseSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PraiseSubmissionUpdateInput, PraiseSubmissionUncheckedUpdateInput>
  }

  /**
   * PraiseSubmission delete
   */
  export type PraiseSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
    /**
     * Filter which PraiseSubmission to delete.
     */
    where: PraiseSubmissionWhereUniqueInput
  }

  /**
   * PraiseSubmission deleteMany
   */
  export type PraiseSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PraiseSubmissions to delete
     */
    where?: PraiseSubmissionWhereInput
    /**
     * Limit how many PraiseSubmissions to delete.
     */
    limit?: number
  }

  /**
   * PraiseSubmission without action
   */
  export type PraiseSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PraiseSubmission
     */
    select?: PraiseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PraiseSubmission
     */
    omit?: PraiseSubmissionOmit<ExtArgs> | null
  }


  /**
   * Model GardenTip
   */

  export type AggregateGardenTip = {
    _count: GardenTipCountAggregateOutputType | null
    _avg: GardenTipAvgAggregateOutputType | null
    _sum: GardenTipSumAggregateOutputType | null
    _min: GardenTipMinAggregateOutputType | null
    _max: GardenTipMaxAggregateOutputType | null
  }

  export type GardenTipAvgAggregateOutputType = {
    stamp: number | null
  }

  export type GardenTipSumAggregateOutputType = {
    stamp: number | null
  }

  export type GardenTipMinAggregateOutputType = {
    id: string | null
    body: string | null
    fromName: string | null
    stamp: number | null
    backglow: boolean | null
    createdAt: Date | null
  }

  export type GardenTipMaxAggregateOutputType = {
    id: string | null
    body: string | null
    fromName: string | null
    stamp: number | null
    backglow: boolean | null
    createdAt: Date | null
  }

  export type GardenTipCountAggregateOutputType = {
    id: number
    body: number
    fromName: number
    stamp: number
    backglow: number
    createdAt: number
    _all: number
  }


  export type GardenTipAvgAggregateInputType = {
    stamp?: true
  }

  export type GardenTipSumAggregateInputType = {
    stamp?: true
  }

  export type GardenTipMinAggregateInputType = {
    id?: true
    body?: true
    fromName?: true
    stamp?: true
    backglow?: true
    createdAt?: true
  }

  export type GardenTipMaxAggregateInputType = {
    id?: true
    body?: true
    fromName?: true
    stamp?: true
    backglow?: true
    createdAt?: true
  }

  export type GardenTipCountAggregateInputType = {
    id?: true
    body?: true
    fromName?: true
    stamp?: true
    backglow?: true
    createdAt?: true
    _all?: true
  }

  export type GardenTipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GardenTip to aggregate.
     */
    where?: GardenTipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GardenTips to fetch.
     */
    orderBy?: GardenTipOrderByWithRelationInput | GardenTipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GardenTipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GardenTips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GardenTips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GardenTips
    **/
    _count?: true | GardenTipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GardenTipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GardenTipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GardenTipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GardenTipMaxAggregateInputType
  }

  export type GetGardenTipAggregateType<T extends GardenTipAggregateArgs> = {
        [P in keyof T & keyof AggregateGardenTip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGardenTip[P]>
      : GetScalarType<T[P], AggregateGardenTip[P]>
  }




  export type GardenTipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GardenTipWhereInput
    orderBy?: GardenTipOrderByWithAggregationInput | GardenTipOrderByWithAggregationInput[]
    by: GardenTipScalarFieldEnum[] | GardenTipScalarFieldEnum
    having?: GardenTipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GardenTipCountAggregateInputType | true
    _avg?: GardenTipAvgAggregateInputType
    _sum?: GardenTipSumAggregateInputType
    _min?: GardenTipMinAggregateInputType
    _max?: GardenTipMaxAggregateInputType
  }

  export type GardenTipGroupByOutputType = {
    id: string
    body: string
    fromName: string | null
    stamp: number
    backglow: boolean
    createdAt: Date
    _count: GardenTipCountAggregateOutputType | null
    _avg: GardenTipAvgAggregateOutputType | null
    _sum: GardenTipSumAggregateOutputType | null
    _min: GardenTipMinAggregateOutputType | null
    _max: GardenTipMaxAggregateOutputType | null
  }

  type GetGardenTipGroupByPayload<T extends GardenTipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GardenTipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GardenTipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GardenTipGroupByOutputType[P]>
            : GetScalarType<T[P], GardenTipGroupByOutputType[P]>
        }
      >
    >


  export type GardenTipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    fromName?: boolean
    stamp?: boolean
    backglow?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["gardenTip"]>

  export type GardenTipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    fromName?: boolean
    stamp?: boolean
    backglow?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["gardenTip"]>

  export type GardenTipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    fromName?: boolean
    stamp?: boolean
    backglow?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["gardenTip"]>

  export type GardenTipSelectScalar = {
    id?: boolean
    body?: boolean
    fromName?: boolean
    stamp?: boolean
    backglow?: boolean
    createdAt?: boolean
  }

  export type GardenTipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "body" | "fromName" | "stamp" | "backglow" | "createdAt", ExtArgs["result"]["gardenTip"]>

  export type $GardenTipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GardenTip"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      body: string
      /**
       * Optional signer name
       */
      fromName: string | null
      /**
       * Index into letter stamp set (0 = default / legacy)
       */
      stamp: number
      /**
       * Soft gold backglow on the letter ball (set in DB / Prisma Studio)
       */
      backglow: boolean
      createdAt: Date
    }, ExtArgs["result"]["gardenTip"]>
    composites: {}
  }

  type GardenTipGetPayload<S extends boolean | null | undefined | GardenTipDefaultArgs> = $Result.GetResult<Prisma.$GardenTipPayload, S>

  type GardenTipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GardenTipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GardenTipCountAggregateInputType | true
    }

  export interface GardenTipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GardenTip'], meta: { name: 'GardenTip' } }
    /**
     * Find zero or one GardenTip that matches the filter.
     * @param {GardenTipFindUniqueArgs} args - Arguments to find a GardenTip
     * @example
     * // Get one GardenTip
     * const gardenTip = await prisma.gardenTip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GardenTipFindUniqueArgs>(args: SelectSubset<T, GardenTipFindUniqueArgs<ExtArgs>>): Prisma__GardenTipClient<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GardenTip that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GardenTipFindUniqueOrThrowArgs} args - Arguments to find a GardenTip
     * @example
     * // Get one GardenTip
     * const gardenTip = await prisma.gardenTip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GardenTipFindUniqueOrThrowArgs>(args: SelectSubset<T, GardenTipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GardenTipClient<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GardenTip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenTipFindFirstArgs} args - Arguments to find a GardenTip
     * @example
     * // Get one GardenTip
     * const gardenTip = await prisma.gardenTip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GardenTipFindFirstArgs>(args?: SelectSubset<T, GardenTipFindFirstArgs<ExtArgs>>): Prisma__GardenTipClient<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GardenTip that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenTipFindFirstOrThrowArgs} args - Arguments to find a GardenTip
     * @example
     * // Get one GardenTip
     * const gardenTip = await prisma.gardenTip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GardenTipFindFirstOrThrowArgs>(args?: SelectSubset<T, GardenTipFindFirstOrThrowArgs<ExtArgs>>): Prisma__GardenTipClient<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GardenTips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenTipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GardenTips
     * const gardenTips = await prisma.gardenTip.findMany()
     * 
     * // Get first 10 GardenTips
     * const gardenTips = await prisma.gardenTip.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gardenTipWithIdOnly = await prisma.gardenTip.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GardenTipFindManyArgs>(args?: SelectSubset<T, GardenTipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GardenTip.
     * @param {GardenTipCreateArgs} args - Arguments to create a GardenTip.
     * @example
     * // Create one GardenTip
     * const GardenTip = await prisma.gardenTip.create({
     *   data: {
     *     // ... data to create a GardenTip
     *   }
     * })
     * 
     */
    create<T extends GardenTipCreateArgs>(args: SelectSubset<T, GardenTipCreateArgs<ExtArgs>>): Prisma__GardenTipClient<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GardenTips.
     * @param {GardenTipCreateManyArgs} args - Arguments to create many GardenTips.
     * @example
     * // Create many GardenTips
     * const gardenTip = await prisma.gardenTip.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GardenTipCreateManyArgs>(args?: SelectSubset<T, GardenTipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GardenTips and returns the data saved in the database.
     * @param {GardenTipCreateManyAndReturnArgs} args - Arguments to create many GardenTips.
     * @example
     * // Create many GardenTips
     * const gardenTip = await prisma.gardenTip.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GardenTips and only return the `id`
     * const gardenTipWithIdOnly = await prisma.gardenTip.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GardenTipCreateManyAndReturnArgs>(args?: SelectSubset<T, GardenTipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GardenTip.
     * @param {GardenTipDeleteArgs} args - Arguments to delete one GardenTip.
     * @example
     * // Delete one GardenTip
     * const GardenTip = await prisma.gardenTip.delete({
     *   where: {
     *     // ... filter to delete one GardenTip
     *   }
     * })
     * 
     */
    delete<T extends GardenTipDeleteArgs>(args: SelectSubset<T, GardenTipDeleteArgs<ExtArgs>>): Prisma__GardenTipClient<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GardenTip.
     * @param {GardenTipUpdateArgs} args - Arguments to update one GardenTip.
     * @example
     * // Update one GardenTip
     * const gardenTip = await prisma.gardenTip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GardenTipUpdateArgs>(args: SelectSubset<T, GardenTipUpdateArgs<ExtArgs>>): Prisma__GardenTipClient<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GardenTips.
     * @param {GardenTipDeleteManyArgs} args - Arguments to filter GardenTips to delete.
     * @example
     * // Delete a few GardenTips
     * const { count } = await prisma.gardenTip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GardenTipDeleteManyArgs>(args?: SelectSubset<T, GardenTipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GardenTips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenTipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GardenTips
     * const gardenTip = await prisma.gardenTip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GardenTipUpdateManyArgs>(args: SelectSubset<T, GardenTipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GardenTips and returns the data updated in the database.
     * @param {GardenTipUpdateManyAndReturnArgs} args - Arguments to update many GardenTips.
     * @example
     * // Update many GardenTips
     * const gardenTip = await prisma.gardenTip.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GardenTips and only return the `id`
     * const gardenTipWithIdOnly = await prisma.gardenTip.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GardenTipUpdateManyAndReturnArgs>(args: SelectSubset<T, GardenTipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GardenTip.
     * @param {GardenTipUpsertArgs} args - Arguments to update or create a GardenTip.
     * @example
     * // Update or create a GardenTip
     * const gardenTip = await prisma.gardenTip.upsert({
     *   create: {
     *     // ... data to create a GardenTip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GardenTip we want to update
     *   }
     * })
     */
    upsert<T extends GardenTipUpsertArgs>(args: SelectSubset<T, GardenTipUpsertArgs<ExtArgs>>): Prisma__GardenTipClient<$Result.GetResult<Prisma.$GardenTipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GardenTips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenTipCountArgs} args - Arguments to filter GardenTips to count.
     * @example
     * // Count the number of GardenTips
     * const count = await prisma.gardenTip.count({
     *   where: {
     *     // ... the filter for the GardenTips we want to count
     *   }
     * })
    **/
    count<T extends GardenTipCountArgs>(
      args?: Subset<T, GardenTipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GardenTipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GardenTip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenTipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GardenTipAggregateArgs>(args: Subset<T, GardenTipAggregateArgs>): Prisma.PrismaPromise<GetGardenTipAggregateType<T>>

    /**
     * Group by GardenTip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GardenTipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GardenTipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GardenTipGroupByArgs['orderBy'] }
        : { orderBy?: GardenTipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GardenTipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGardenTipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GardenTip model
   */
  readonly fields: GardenTipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GardenTip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GardenTipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GardenTip model
   */
  interface GardenTipFieldRefs {
    readonly id: FieldRef<"GardenTip", 'String'>
    readonly body: FieldRef<"GardenTip", 'String'>
    readonly fromName: FieldRef<"GardenTip", 'String'>
    readonly stamp: FieldRef<"GardenTip", 'Int'>
    readonly backglow: FieldRef<"GardenTip", 'Boolean'>
    readonly createdAt: FieldRef<"GardenTip", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GardenTip findUnique
   */
  export type GardenTipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * Filter, which GardenTip to fetch.
     */
    where: GardenTipWhereUniqueInput
  }

  /**
   * GardenTip findUniqueOrThrow
   */
  export type GardenTipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * Filter, which GardenTip to fetch.
     */
    where: GardenTipWhereUniqueInput
  }

  /**
   * GardenTip findFirst
   */
  export type GardenTipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * Filter, which GardenTip to fetch.
     */
    where?: GardenTipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GardenTips to fetch.
     */
    orderBy?: GardenTipOrderByWithRelationInput | GardenTipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GardenTips.
     */
    cursor?: GardenTipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GardenTips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GardenTips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GardenTips.
     */
    distinct?: GardenTipScalarFieldEnum | GardenTipScalarFieldEnum[]
  }

  /**
   * GardenTip findFirstOrThrow
   */
  export type GardenTipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * Filter, which GardenTip to fetch.
     */
    where?: GardenTipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GardenTips to fetch.
     */
    orderBy?: GardenTipOrderByWithRelationInput | GardenTipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GardenTips.
     */
    cursor?: GardenTipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GardenTips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GardenTips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GardenTips.
     */
    distinct?: GardenTipScalarFieldEnum | GardenTipScalarFieldEnum[]
  }

  /**
   * GardenTip findMany
   */
  export type GardenTipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * Filter, which GardenTips to fetch.
     */
    where?: GardenTipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GardenTips to fetch.
     */
    orderBy?: GardenTipOrderByWithRelationInput | GardenTipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GardenTips.
     */
    cursor?: GardenTipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GardenTips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GardenTips.
     */
    skip?: number
    distinct?: GardenTipScalarFieldEnum | GardenTipScalarFieldEnum[]
  }

  /**
   * GardenTip create
   */
  export type GardenTipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * The data needed to create a GardenTip.
     */
    data: XOR<GardenTipCreateInput, GardenTipUncheckedCreateInput>
  }

  /**
   * GardenTip createMany
   */
  export type GardenTipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GardenTips.
     */
    data: GardenTipCreateManyInput | GardenTipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GardenTip createManyAndReturn
   */
  export type GardenTipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * The data used to create many GardenTips.
     */
    data: GardenTipCreateManyInput | GardenTipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GardenTip update
   */
  export type GardenTipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * The data needed to update a GardenTip.
     */
    data: XOR<GardenTipUpdateInput, GardenTipUncheckedUpdateInput>
    /**
     * Choose, which GardenTip to update.
     */
    where: GardenTipWhereUniqueInput
  }

  /**
   * GardenTip updateMany
   */
  export type GardenTipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GardenTips.
     */
    data: XOR<GardenTipUpdateManyMutationInput, GardenTipUncheckedUpdateManyInput>
    /**
     * Filter which GardenTips to update
     */
    where?: GardenTipWhereInput
    /**
     * Limit how many GardenTips to update.
     */
    limit?: number
  }

  /**
   * GardenTip updateManyAndReturn
   */
  export type GardenTipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * The data used to update GardenTips.
     */
    data: XOR<GardenTipUpdateManyMutationInput, GardenTipUncheckedUpdateManyInput>
    /**
     * Filter which GardenTips to update
     */
    where?: GardenTipWhereInput
    /**
     * Limit how many GardenTips to update.
     */
    limit?: number
  }

  /**
   * GardenTip upsert
   */
  export type GardenTipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * The filter to search for the GardenTip to update in case it exists.
     */
    where: GardenTipWhereUniqueInput
    /**
     * In case the GardenTip found by the `where` argument doesn't exist, create a new GardenTip with this data.
     */
    create: XOR<GardenTipCreateInput, GardenTipUncheckedCreateInput>
    /**
     * In case the GardenTip was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GardenTipUpdateInput, GardenTipUncheckedUpdateInput>
  }

  /**
   * GardenTip delete
   */
  export type GardenTipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
    /**
     * Filter which GardenTip to delete.
     */
    where: GardenTipWhereUniqueInput
  }

  /**
   * GardenTip deleteMany
   */
  export type GardenTipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GardenTips to delete
     */
    where?: GardenTipWhereInput
    /**
     * Limit how many GardenTips to delete.
     */
    limit?: number
  }

  /**
   * GardenTip without action
   */
  export type GardenTipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GardenTip
     */
    select?: GardenTipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GardenTip
     */
    omit?: GardenTipOmit<ExtArgs> | null
  }


  /**
   * Model OathTaking
   */

  export type AggregateOathTaking = {
    _count: OathTakingCountAggregateOutputType | null
    _min: OathTakingMinAggregateOutputType | null
    _max: OathTakingMaxAggregateOutputType | null
  }

  export type OathTakingMinAggregateOutputType = {
    id: string | null
    oathId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type OathTakingMaxAggregateOutputType = {
    id: string | null
    oathId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type OathTakingCountAggregateOutputType = {
    id: number
    oathId: number
    name: number
    createdAt: number
    _all: number
  }


  export type OathTakingMinAggregateInputType = {
    id?: true
    oathId?: true
    name?: true
    createdAt?: true
  }

  export type OathTakingMaxAggregateInputType = {
    id?: true
    oathId?: true
    name?: true
    createdAt?: true
  }

  export type OathTakingCountAggregateInputType = {
    id?: true
    oathId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type OathTakingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OathTaking to aggregate.
     */
    where?: OathTakingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OathTakings to fetch.
     */
    orderBy?: OathTakingOrderByWithRelationInput | OathTakingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OathTakingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OathTakings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OathTakings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OathTakings
    **/
    _count?: true | OathTakingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OathTakingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OathTakingMaxAggregateInputType
  }

  export type GetOathTakingAggregateType<T extends OathTakingAggregateArgs> = {
        [P in keyof T & keyof AggregateOathTaking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOathTaking[P]>
      : GetScalarType<T[P], AggregateOathTaking[P]>
  }




  export type OathTakingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OathTakingWhereInput
    orderBy?: OathTakingOrderByWithAggregationInput | OathTakingOrderByWithAggregationInput[]
    by: OathTakingScalarFieldEnum[] | OathTakingScalarFieldEnum
    having?: OathTakingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OathTakingCountAggregateInputType | true
    _min?: OathTakingMinAggregateInputType
    _max?: OathTakingMaxAggregateInputType
  }

  export type OathTakingGroupByOutputType = {
    id: string
    oathId: string
    name: string
    createdAt: Date
    _count: OathTakingCountAggregateOutputType | null
    _min: OathTakingMinAggregateOutputType | null
    _max: OathTakingMaxAggregateOutputType | null
  }

  type GetOathTakingGroupByPayload<T extends OathTakingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OathTakingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OathTakingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OathTakingGroupByOutputType[P]>
            : GetScalarType<T[P], OathTakingGroupByOutputType[P]>
        }
      >
    >


  export type OathTakingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    oathId?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["oathTaking"]>

  export type OathTakingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    oathId?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["oathTaking"]>

  export type OathTakingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    oathId?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["oathTaking"]>

  export type OathTakingSelectScalar = {
    id?: boolean
    oathId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type OathTakingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "oathId" | "name" | "createdAt", ExtArgs["result"]["oathTaking"]>

  export type $OathTakingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OathTaking"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      oathId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["oathTaking"]>
    composites: {}
  }

  type OathTakingGetPayload<S extends boolean | null | undefined | OathTakingDefaultArgs> = $Result.GetResult<Prisma.$OathTakingPayload, S>

  type OathTakingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OathTakingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OathTakingCountAggregateInputType | true
    }

  export interface OathTakingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OathTaking'], meta: { name: 'OathTaking' } }
    /**
     * Find zero or one OathTaking that matches the filter.
     * @param {OathTakingFindUniqueArgs} args - Arguments to find a OathTaking
     * @example
     * // Get one OathTaking
     * const oathTaking = await prisma.oathTaking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OathTakingFindUniqueArgs>(args: SelectSubset<T, OathTakingFindUniqueArgs<ExtArgs>>): Prisma__OathTakingClient<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OathTaking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OathTakingFindUniqueOrThrowArgs} args - Arguments to find a OathTaking
     * @example
     * // Get one OathTaking
     * const oathTaking = await prisma.oathTaking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OathTakingFindUniqueOrThrowArgs>(args: SelectSubset<T, OathTakingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OathTakingClient<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OathTaking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OathTakingFindFirstArgs} args - Arguments to find a OathTaking
     * @example
     * // Get one OathTaking
     * const oathTaking = await prisma.oathTaking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OathTakingFindFirstArgs>(args?: SelectSubset<T, OathTakingFindFirstArgs<ExtArgs>>): Prisma__OathTakingClient<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OathTaking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OathTakingFindFirstOrThrowArgs} args - Arguments to find a OathTaking
     * @example
     * // Get one OathTaking
     * const oathTaking = await prisma.oathTaking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OathTakingFindFirstOrThrowArgs>(args?: SelectSubset<T, OathTakingFindFirstOrThrowArgs<ExtArgs>>): Prisma__OathTakingClient<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OathTakings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OathTakingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OathTakings
     * const oathTakings = await prisma.oathTaking.findMany()
     * 
     * // Get first 10 OathTakings
     * const oathTakings = await prisma.oathTaking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oathTakingWithIdOnly = await prisma.oathTaking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OathTakingFindManyArgs>(args?: SelectSubset<T, OathTakingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OathTaking.
     * @param {OathTakingCreateArgs} args - Arguments to create a OathTaking.
     * @example
     * // Create one OathTaking
     * const OathTaking = await prisma.oathTaking.create({
     *   data: {
     *     // ... data to create a OathTaking
     *   }
     * })
     * 
     */
    create<T extends OathTakingCreateArgs>(args: SelectSubset<T, OathTakingCreateArgs<ExtArgs>>): Prisma__OathTakingClient<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OathTakings.
     * @param {OathTakingCreateManyArgs} args - Arguments to create many OathTakings.
     * @example
     * // Create many OathTakings
     * const oathTaking = await prisma.oathTaking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OathTakingCreateManyArgs>(args?: SelectSubset<T, OathTakingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OathTakings and returns the data saved in the database.
     * @param {OathTakingCreateManyAndReturnArgs} args - Arguments to create many OathTakings.
     * @example
     * // Create many OathTakings
     * const oathTaking = await prisma.oathTaking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OathTakings and only return the `id`
     * const oathTakingWithIdOnly = await prisma.oathTaking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OathTakingCreateManyAndReturnArgs>(args?: SelectSubset<T, OathTakingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OathTaking.
     * @param {OathTakingDeleteArgs} args - Arguments to delete one OathTaking.
     * @example
     * // Delete one OathTaking
     * const OathTaking = await prisma.oathTaking.delete({
     *   where: {
     *     // ... filter to delete one OathTaking
     *   }
     * })
     * 
     */
    delete<T extends OathTakingDeleteArgs>(args: SelectSubset<T, OathTakingDeleteArgs<ExtArgs>>): Prisma__OathTakingClient<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OathTaking.
     * @param {OathTakingUpdateArgs} args - Arguments to update one OathTaking.
     * @example
     * // Update one OathTaking
     * const oathTaking = await prisma.oathTaking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OathTakingUpdateArgs>(args: SelectSubset<T, OathTakingUpdateArgs<ExtArgs>>): Prisma__OathTakingClient<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OathTakings.
     * @param {OathTakingDeleteManyArgs} args - Arguments to filter OathTakings to delete.
     * @example
     * // Delete a few OathTakings
     * const { count } = await prisma.oathTaking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OathTakingDeleteManyArgs>(args?: SelectSubset<T, OathTakingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OathTakings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OathTakingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OathTakings
     * const oathTaking = await prisma.oathTaking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OathTakingUpdateManyArgs>(args: SelectSubset<T, OathTakingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OathTakings and returns the data updated in the database.
     * @param {OathTakingUpdateManyAndReturnArgs} args - Arguments to update many OathTakings.
     * @example
     * // Update many OathTakings
     * const oathTaking = await prisma.oathTaking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OathTakings and only return the `id`
     * const oathTakingWithIdOnly = await prisma.oathTaking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OathTakingUpdateManyAndReturnArgs>(args: SelectSubset<T, OathTakingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OathTaking.
     * @param {OathTakingUpsertArgs} args - Arguments to update or create a OathTaking.
     * @example
     * // Update or create a OathTaking
     * const oathTaking = await prisma.oathTaking.upsert({
     *   create: {
     *     // ... data to create a OathTaking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OathTaking we want to update
     *   }
     * })
     */
    upsert<T extends OathTakingUpsertArgs>(args: SelectSubset<T, OathTakingUpsertArgs<ExtArgs>>): Prisma__OathTakingClient<$Result.GetResult<Prisma.$OathTakingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OathTakings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OathTakingCountArgs} args - Arguments to filter OathTakings to count.
     * @example
     * // Count the number of OathTakings
     * const count = await prisma.oathTaking.count({
     *   where: {
     *     // ... the filter for the OathTakings we want to count
     *   }
     * })
    **/
    count<T extends OathTakingCountArgs>(
      args?: Subset<T, OathTakingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OathTakingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OathTaking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OathTakingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OathTakingAggregateArgs>(args: Subset<T, OathTakingAggregateArgs>): Prisma.PrismaPromise<GetOathTakingAggregateType<T>>

    /**
     * Group by OathTaking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OathTakingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OathTakingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OathTakingGroupByArgs['orderBy'] }
        : { orderBy?: OathTakingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OathTakingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOathTakingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OathTaking model
   */
  readonly fields: OathTakingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OathTaking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OathTakingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OathTaking model
   */
  interface OathTakingFieldRefs {
    readonly id: FieldRef<"OathTaking", 'String'>
    readonly oathId: FieldRef<"OathTaking", 'String'>
    readonly name: FieldRef<"OathTaking", 'String'>
    readonly createdAt: FieldRef<"OathTaking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OathTaking findUnique
   */
  export type OathTakingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * Filter, which OathTaking to fetch.
     */
    where: OathTakingWhereUniqueInput
  }

  /**
   * OathTaking findUniqueOrThrow
   */
  export type OathTakingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * Filter, which OathTaking to fetch.
     */
    where: OathTakingWhereUniqueInput
  }

  /**
   * OathTaking findFirst
   */
  export type OathTakingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * Filter, which OathTaking to fetch.
     */
    where?: OathTakingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OathTakings to fetch.
     */
    orderBy?: OathTakingOrderByWithRelationInput | OathTakingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OathTakings.
     */
    cursor?: OathTakingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OathTakings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OathTakings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OathTakings.
     */
    distinct?: OathTakingScalarFieldEnum | OathTakingScalarFieldEnum[]
  }

  /**
   * OathTaking findFirstOrThrow
   */
  export type OathTakingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * Filter, which OathTaking to fetch.
     */
    where?: OathTakingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OathTakings to fetch.
     */
    orderBy?: OathTakingOrderByWithRelationInput | OathTakingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OathTakings.
     */
    cursor?: OathTakingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OathTakings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OathTakings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OathTakings.
     */
    distinct?: OathTakingScalarFieldEnum | OathTakingScalarFieldEnum[]
  }

  /**
   * OathTaking findMany
   */
  export type OathTakingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * Filter, which OathTakings to fetch.
     */
    where?: OathTakingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OathTakings to fetch.
     */
    orderBy?: OathTakingOrderByWithRelationInput | OathTakingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OathTakings.
     */
    cursor?: OathTakingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OathTakings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OathTakings.
     */
    skip?: number
    distinct?: OathTakingScalarFieldEnum | OathTakingScalarFieldEnum[]
  }

  /**
   * OathTaking create
   */
  export type OathTakingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * The data needed to create a OathTaking.
     */
    data: XOR<OathTakingCreateInput, OathTakingUncheckedCreateInput>
  }

  /**
   * OathTaking createMany
   */
  export type OathTakingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OathTakings.
     */
    data: OathTakingCreateManyInput | OathTakingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OathTaking createManyAndReturn
   */
  export type OathTakingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * The data used to create many OathTakings.
     */
    data: OathTakingCreateManyInput | OathTakingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OathTaking update
   */
  export type OathTakingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * The data needed to update a OathTaking.
     */
    data: XOR<OathTakingUpdateInput, OathTakingUncheckedUpdateInput>
    /**
     * Choose, which OathTaking to update.
     */
    where: OathTakingWhereUniqueInput
  }

  /**
   * OathTaking updateMany
   */
  export type OathTakingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OathTakings.
     */
    data: XOR<OathTakingUpdateManyMutationInput, OathTakingUncheckedUpdateManyInput>
    /**
     * Filter which OathTakings to update
     */
    where?: OathTakingWhereInput
    /**
     * Limit how many OathTakings to update.
     */
    limit?: number
  }

  /**
   * OathTaking updateManyAndReturn
   */
  export type OathTakingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * The data used to update OathTakings.
     */
    data: XOR<OathTakingUpdateManyMutationInput, OathTakingUncheckedUpdateManyInput>
    /**
     * Filter which OathTakings to update
     */
    where?: OathTakingWhereInput
    /**
     * Limit how many OathTakings to update.
     */
    limit?: number
  }

  /**
   * OathTaking upsert
   */
  export type OathTakingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * The filter to search for the OathTaking to update in case it exists.
     */
    where: OathTakingWhereUniqueInput
    /**
     * In case the OathTaking found by the `where` argument doesn't exist, create a new OathTaking with this data.
     */
    create: XOR<OathTakingCreateInput, OathTakingUncheckedCreateInput>
    /**
     * In case the OathTaking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OathTakingUpdateInput, OathTakingUncheckedUpdateInput>
  }

  /**
   * OathTaking delete
   */
  export type OathTakingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
    /**
     * Filter which OathTaking to delete.
     */
    where: OathTakingWhereUniqueInput
  }

  /**
   * OathTaking deleteMany
   */
  export type OathTakingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OathTakings to delete
     */
    where?: OathTakingWhereInput
    /**
     * Limit how many OathTakings to delete.
     */
    limit?: number
  }

  /**
   * OathTaking without action
   */
  export type OathTakingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OathTaking
     */
    select?: OathTakingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OathTaking
     */
    omit?: OathTakingOmit<ExtArgs> | null
  }


  /**
   * Model GroupStorySentence
   */

  export type AggregateGroupStorySentence = {
    _count: GroupStorySentenceCountAggregateOutputType | null
    _min: GroupStorySentenceMinAggregateOutputType | null
    _max: GroupStorySentenceMaxAggregateOutputType | null
  }

  export type GroupStorySentenceMinAggregateOutputType = {
    id: string | null
    text: string | null
    author: string | null
    createdAt: Date | null
  }

  export type GroupStorySentenceMaxAggregateOutputType = {
    id: string | null
    text: string | null
    author: string | null
    createdAt: Date | null
  }

  export type GroupStorySentenceCountAggregateOutputType = {
    id: number
    text: number
    author: number
    createdAt: number
    _all: number
  }


  export type GroupStorySentenceMinAggregateInputType = {
    id?: true
    text?: true
    author?: true
    createdAt?: true
  }

  export type GroupStorySentenceMaxAggregateInputType = {
    id?: true
    text?: true
    author?: true
    createdAt?: true
  }

  export type GroupStorySentenceCountAggregateInputType = {
    id?: true
    text?: true
    author?: true
    createdAt?: true
    _all?: true
  }

  export type GroupStorySentenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupStorySentence to aggregate.
     */
    where?: GroupStorySentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupStorySentences to fetch.
     */
    orderBy?: GroupStorySentenceOrderByWithRelationInput | GroupStorySentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupStorySentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupStorySentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupStorySentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupStorySentences
    **/
    _count?: true | GroupStorySentenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupStorySentenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupStorySentenceMaxAggregateInputType
  }

  export type GetGroupStorySentenceAggregateType<T extends GroupStorySentenceAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupStorySentence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupStorySentence[P]>
      : GetScalarType<T[P], AggregateGroupStorySentence[P]>
  }




  export type GroupStorySentenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupStorySentenceWhereInput
    orderBy?: GroupStorySentenceOrderByWithAggregationInput | GroupStorySentenceOrderByWithAggregationInput[]
    by: GroupStorySentenceScalarFieldEnum[] | GroupStorySentenceScalarFieldEnum
    having?: GroupStorySentenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupStorySentenceCountAggregateInputType | true
    _min?: GroupStorySentenceMinAggregateInputType
    _max?: GroupStorySentenceMaxAggregateInputType
  }

  export type GroupStorySentenceGroupByOutputType = {
    id: string
    text: string
    author: string
    createdAt: Date
    _count: GroupStorySentenceCountAggregateOutputType | null
    _min: GroupStorySentenceMinAggregateOutputType | null
    _max: GroupStorySentenceMaxAggregateOutputType | null
  }

  type GetGroupStorySentenceGroupByPayload<T extends GroupStorySentenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupStorySentenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupStorySentenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupStorySentenceGroupByOutputType[P]>
            : GetScalarType<T[P], GroupStorySentenceGroupByOutputType[P]>
        }
      >
    >


  export type GroupStorySentenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["groupStorySentence"]>

  export type GroupStorySentenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["groupStorySentence"]>

  export type GroupStorySentenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["groupStorySentence"]>

  export type GroupStorySentenceSelectScalar = {
    id?: boolean
    text?: boolean
    author?: boolean
    createdAt?: boolean
  }

  export type GroupStorySentenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "author" | "createdAt", ExtArgs["result"]["groupStorySentence"]>

  export type $GroupStorySentencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupStorySentence"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      /**
       * Exact text as submitted (spacing & characters preserved), max 250
       */
      text: string
      author: string
      createdAt: Date
    }, ExtArgs["result"]["groupStorySentence"]>
    composites: {}
  }

  type GroupStorySentenceGetPayload<S extends boolean | null | undefined | GroupStorySentenceDefaultArgs> = $Result.GetResult<Prisma.$GroupStorySentencePayload, S>

  type GroupStorySentenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupStorySentenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupStorySentenceCountAggregateInputType | true
    }

  export interface GroupStorySentenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupStorySentence'], meta: { name: 'GroupStorySentence' } }
    /**
     * Find zero or one GroupStorySentence that matches the filter.
     * @param {GroupStorySentenceFindUniqueArgs} args - Arguments to find a GroupStorySentence
     * @example
     * // Get one GroupStorySentence
     * const groupStorySentence = await prisma.groupStorySentence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupStorySentenceFindUniqueArgs>(args: SelectSubset<T, GroupStorySentenceFindUniqueArgs<ExtArgs>>): Prisma__GroupStorySentenceClient<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupStorySentence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupStorySentenceFindUniqueOrThrowArgs} args - Arguments to find a GroupStorySentence
     * @example
     * // Get one GroupStorySentence
     * const groupStorySentence = await prisma.groupStorySentence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupStorySentenceFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupStorySentenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupStorySentenceClient<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupStorySentence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStorySentenceFindFirstArgs} args - Arguments to find a GroupStorySentence
     * @example
     * // Get one GroupStorySentence
     * const groupStorySentence = await prisma.groupStorySentence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupStorySentenceFindFirstArgs>(args?: SelectSubset<T, GroupStorySentenceFindFirstArgs<ExtArgs>>): Prisma__GroupStorySentenceClient<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupStorySentence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStorySentenceFindFirstOrThrowArgs} args - Arguments to find a GroupStorySentence
     * @example
     * // Get one GroupStorySentence
     * const groupStorySentence = await prisma.groupStorySentence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupStorySentenceFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupStorySentenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupStorySentenceClient<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupStorySentences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStorySentenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupStorySentences
     * const groupStorySentences = await prisma.groupStorySentence.findMany()
     * 
     * // Get first 10 GroupStorySentences
     * const groupStorySentences = await prisma.groupStorySentence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupStorySentenceWithIdOnly = await prisma.groupStorySentence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupStorySentenceFindManyArgs>(args?: SelectSubset<T, GroupStorySentenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupStorySentence.
     * @param {GroupStorySentenceCreateArgs} args - Arguments to create a GroupStorySentence.
     * @example
     * // Create one GroupStorySentence
     * const GroupStorySentence = await prisma.groupStorySentence.create({
     *   data: {
     *     // ... data to create a GroupStorySentence
     *   }
     * })
     * 
     */
    create<T extends GroupStorySentenceCreateArgs>(args: SelectSubset<T, GroupStorySentenceCreateArgs<ExtArgs>>): Prisma__GroupStorySentenceClient<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupStorySentences.
     * @param {GroupStorySentenceCreateManyArgs} args - Arguments to create many GroupStorySentences.
     * @example
     * // Create many GroupStorySentences
     * const groupStorySentence = await prisma.groupStorySentence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupStorySentenceCreateManyArgs>(args?: SelectSubset<T, GroupStorySentenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupStorySentences and returns the data saved in the database.
     * @param {GroupStorySentenceCreateManyAndReturnArgs} args - Arguments to create many GroupStorySentences.
     * @example
     * // Create many GroupStorySentences
     * const groupStorySentence = await prisma.groupStorySentence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupStorySentences and only return the `id`
     * const groupStorySentenceWithIdOnly = await prisma.groupStorySentence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupStorySentenceCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupStorySentenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupStorySentence.
     * @param {GroupStorySentenceDeleteArgs} args - Arguments to delete one GroupStorySentence.
     * @example
     * // Delete one GroupStorySentence
     * const GroupStorySentence = await prisma.groupStorySentence.delete({
     *   where: {
     *     // ... filter to delete one GroupStorySentence
     *   }
     * })
     * 
     */
    delete<T extends GroupStorySentenceDeleteArgs>(args: SelectSubset<T, GroupStorySentenceDeleteArgs<ExtArgs>>): Prisma__GroupStorySentenceClient<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupStorySentence.
     * @param {GroupStorySentenceUpdateArgs} args - Arguments to update one GroupStorySentence.
     * @example
     * // Update one GroupStorySentence
     * const groupStorySentence = await prisma.groupStorySentence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupStorySentenceUpdateArgs>(args: SelectSubset<T, GroupStorySentenceUpdateArgs<ExtArgs>>): Prisma__GroupStorySentenceClient<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupStorySentences.
     * @param {GroupStorySentenceDeleteManyArgs} args - Arguments to filter GroupStorySentences to delete.
     * @example
     * // Delete a few GroupStorySentences
     * const { count } = await prisma.groupStorySentence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupStorySentenceDeleteManyArgs>(args?: SelectSubset<T, GroupStorySentenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupStorySentences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStorySentenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupStorySentences
     * const groupStorySentence = await prisma.groupStorySentence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupStorySentenceUpdateManyArgs>(args: SelectSubset<T, GroupStorySentenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupStorySentences and returns the data updated in the database.
     * @param {GroupStorySentenceUpdateManyAndReturnArgs} args - Arguments to update many GroupStorySentences.
     * @example
     * // Update many GroupStorySentences
     * const groupStorySentence = await prisma.groupStorySentence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupStorySentences and only return the `id`
     * const groupStorySentenceWithIdOnly = await prisma.groupStorySentence.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupStorySentenceUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupStorySentenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupStorySentence.
     * @param {GroupStorySentenceUpsertArgs} args - Arguments to update or create a GroupStorySentence.
     * @example
     * // Update or create a GroupStorySentence
     * const groupStorySentence = await prisma.groupStorySentence.upsert({
     *   create: {
     *     // ... data to create a GroupStorySentence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupStorySentence we want to update
     *   }
     * })
     */
    upsert<T extends GroupStorySentenceUpsertArgs>(args: SelectSubset<T, GroupStorySentenceUpsertArgs<ExtArgs>>): Prisma__GroupStorySentenceClient<$Result.GetResult<Prisma.$GroupStorySentencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupStorySentences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStorySentenceCountArgs} args - Arguments to filter GroupStorySentences to count.
     * @example
     * // Count the number of GroupStorySentences
     * const count = await prisma.groupStorySentence.count({
     *   where: {
     *     // ... the filter for the GroupStorySentences we want to count
     *   }
     * })
    **/
    count<T extends GroupStorySentenceCountArgs>(
      args?: Subset<T, GroupStorySentenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupStorySentenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupStorySentence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStorySentenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupStorySentenceAggregateArgs>(args: Subset<T, GroupStorySentenceAggregateArgs>): Prisma.PrismaPromise<GetGroupStorySentenceAggregateType<T>>

    /**
     * Group by GroupStorySentence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStorySentenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupStorySentenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupStorySentenceGroupByArgs['orderBy'] }
        : { orderBy?: GroupStorySentenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupStorySentenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupStorySentenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupStorySentence model
   */
  readonly fields: GroupStorySentenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupStorySentence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupStorySentenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupStorySentence model
   */
  interface GroupStorySentenceFieldRefs {
    readonly id: FieldRef<"GroupStorySentence", 'String'>
    readonly text: FieldRef<"GroupStorySentence", 'String'>
    readonly author: FieldRef<"GroupStorySentence", 'String'>
    readonly createdAt: FieldRef<"GroupStorySentence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupStorySentence findUnique
   */
  export type GroupStorySentenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * Filter, which GroupStorySentence to fetch.
     */
    where: GroupStorySentenceWhereUniqueInput
  }

  /**
   * GroupStorySentence findUniqueOrThrow
   */
  export type GroupStorySentenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * Filter, which GroupStorySentence to fetch.
     */
    where: GroupStorySentenceWhereUniqueInput
  }

  /**
   * GroupStorySentence findFirst
   */
  export type GroupStorySentenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * Filter, which GroupStorySentence to fetch.
     */
    where?: GroupStorySentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupStorySentences to fetch.
     */
    orderBy?: GroupStorySentenceOrderByWithRelationInput | GroupStorySentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupStorySentences.
     */
    cursor?: GroupStorySentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupStorySentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupStorySentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupStorySentences.
     */
    distinct?: GroupStorySentenceScalarFieldEnum | GroupStorySentenceScalarFieldEnum[]
  }

  /**
   * GroupStorySentence findFirstOrThrow
   */
  export type GroupStorySentenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * Filter, which GroupStorySentence to fetch.
     */
    where?: GroupStorySentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupStorySentences to fetch.
     */
    orderBy?: GroupStorySentenceOrderByWithRelationInput | GroupStorySentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupStorySentences.
     */
    cursor?: GroupStorySentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupStorySentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupStorySentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupStorySentences.
     */
    distinct?: GroupStorySentenceScalarFieldEnum | GroupStorySentenceScalarFieldEnum[]
  }

  /**
   * GroupStorySentence findMany
   */
  export type GroupStorySentenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * Filter, which GroupStorySentences to fetch.
     */
    where?: GroupStorySentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupStorySentences to fetch.
     */
    orderBy?: GroupStorySentenceOrderByWithRelationInput | GroupStorySentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupStorySentences.
     */
    cursor?: GroupStorySentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupStorySentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupStorySentences.
     */
    skip?: number
    distinct?: GroupStorySentenceScalarFieldEnum | GroupStorySentenceScalarFieldEnum[]
  }

  /**
   * GroupStorySentence create
   */
  export type GroupStorySentenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * The data needed to create a GroupStorySentence.
     */
    data: XOR<GroupStorySentenceCreateInput, GroupStorySentenceUncheckedCreateInput>
  }

  /**
   * GroupStorySentence createMany
   */
  export type GroupStorySentenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupStorySentences.
     */
    data: GroupStorySentenceCreateManyInput | GroupStorySentenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupStorySentence createManyAndReturn
   */
  export type GroupStorySentenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * The data used to create many GroupStorySentences.
     */
    data: GroupStorySentenceCreateManyInput | GroupStorySentenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupStorySentence update
   */
  export type GroupStorySentenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * The data needed to update a GroupStorySentence.
     */
    data: XOR<GroupStorySentenceUpdateInput, GroupStorySentenceUncheckedUpdateInput>
    /**
     * Choose, which GroupStorySentence to update.
     */
    where: GroupStorySentenceWhereUniqueInput
  }

  /**
   * GroupStorySentence updateMany
   */
  export type GroupStorySentenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupStorySentences.
     */
    data: XOR<GroupStorySentenceUpdateManyMutationInput, GroupStorySentenceUncheckedUpdateManyInput>
    /**
     * Filter which GroupStorySentences to update
     */
    where?: GroupStorySentenceWhereInput
    /**
     * Limit how many GroupStorySentences to update.
     */
    limit?: number
  }

  /**
   * GroupStorySentence updateManyAndReturn
   */
  export type GroupStorySentenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * The data used to update GroupStorySentences.
     */
    data: XOR<GroupStorySentenceUpdateManyMutationInput, GroupStorySentenceUncheckedUpdateManyInput>
    /**
     * Filter which GroupStorySentences to update
     */
    where?: GroupStorySentenceWhereInput
    /**
     * Limit how many GroupStorySentences to update.
     */
    limit?: number
  }

  /**
   * GroupStorySentence upsert
   */
  export type GroupStorySentenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * The filter to search for the GroupStorySentence to update in case it exists.
     */
    where: GroupStorySentenceWhereUniqueInput
    /**
     * In case the GroupStorySentence found by the `where` argument doesn't exist, create a new GroupStorySentence with this data.
     */
    create: XOR<GroupStorySentenceCreateInput, GroupStorySentenceUncheckedCreateInput>
    /**
     * In case the GroupStorySentence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupStorySentenceUpdateInput, GroupStorySentenceUncheckedUpdateInput>
  }

  /**
   * GroupStorySentence delete
   */
  export type GroupStorySentenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
    /**
     * Filter which GroupStorySentence to delete.
     */
    where: GroupStorySentenceWhereUniqueInput
  }

  /**
   * GroupStorySentence deleteMany
   */
  export type GroupStorySentenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupStorySentences to delete
     */
    where?: GroupStorySentenceWhereInput
    /**
     * Limit how many GroupStorySentences to delete.
     */
    limit?: number
  }

  /**
   * GroupStorySentence without action
   */
  export type GroupStorySentenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStorySentence
     */
    select?: GroupStorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStorySentence
     */
    omit?: GroupStorySentenceOmit<ExtArgs> | null
  }


  /**
   * Model GroupStoryChatMessage
   */

  export type AggregateGroupStoryChatMessage = {
    _count: GroupStoryChatMessageCountAggregateOutputType | null
    _min: GroupStoryChatMessageMinAggregateOutputType | null
    _max: GroupStoryChatMessageMaxAggregateOutputType | null
  }

  export type GroupStoryChatMessageMinAggregateOutputType = {
    id: string | null
    body: string | null
    author: string | null
    createdAt: Date | null
  }

  export type GroupStoryChatMessageMaxAggregateOutputType = {
    id: string | null
    body: string | null
    author: string | null
    createdAt: Date | null
  }

  export type GroupStoryChatMessageCountAggregateOutputType = {
    id: number
    body: number
    author: number
    createdAt: number
    _all: number
  }


  export type GroupStoryChatMessageMinAggregateInputType = {
    id?: true
    body?: true
    author?: true
    createdAt?: true
  }

  export type GroupStoryChatMessageMaxAggregateInputType = {
    id?: true
    body?: true
    author?: true
    createdAt?: true
  }

  export type GroupStoryChatMessageCountAggregateInputType = {
    id?: true
    body?: true
    author?: true
    createdAt?: true
    _all?: true
  }

  export type GroupStoryChatMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupStoryChatMessage to aggregate.
     */
    where?: GroupStoryChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupStoryChatMessages to fetch.
     */
    orderBy?: GroupStoryChatMessageOrderByWithRelationInput | GroupStoryChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupStoryChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupStoryChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupStoryChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupStoryChatMessages
    **/
    _count?: true | GroupStoryChatMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupStoryChatMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupStoryChatMessageMaxAggregateInputType
  }

  export type GetGroupStoryChatMessageAggregateType<T extends GroupStoryChatMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupStoryChatMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupStoryChatMessage[P]>
      : GetScalarType<T[P], AggregateGroupStoryChatMessage[P]>
  }




  export type GroupStoryChatMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupStoryChatMessageWhereInput
    orderBy?: GroupStoryChatMessageOrderByWithAggregationInput | GroupStoryChatMessageOrderByWithAggregationInput[]
    by: GroupStoryChatMessageScalarFieldEnum[] | GroupStoryChatMessageScalarFieldEnum
    having?: GroupStoryChatMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupStoryChatMessageCountAggregateInputType | true
    _min?: GroupStoryChatMessageMinAggregateInputType
    _max?: GroupStoryChatMessageMaxAggregateInputType
  }

  export type GroupStoryChatMessageGroupByOutputType = {
    id: string
    body: string
    author: string | null
    createdAt: Date
    _count: GroupStoryChatMessageCountAggregateOutputType | null
    _min: GroupStoryChatMessageMinAggregateOutputType | null
    _max: GroupStoryChatMessageMaxAggregateOutputType | null
  }

  type GetGroupStoryChatMessageGroupByPayload<T extends GroupStoryChatMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupStoryChatMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupStoryChatMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupStoryChatMessageGroupByOutputType[P]>
            : GetScalarType<T[P], GroupStoryChatMessageGroupByOutputType[P]>
        }
      >
    >


  export type GroupStoryChatMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["groupStoryChatMessage"]>

  export type GroupStoryChatMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["groupStoryChatMessage"]>

  export type GroupStoryChatMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["groupStoryChatMessage"]>

  export type GroupStoryChatMessageSelectScalar = {
    id?: boolean
    body?: boolean
    author?: boolean
    createdAt?: boolean
  }

  export type GroupStoryChatMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "body" | "author" | "createdAt", ExtArgs["result"]["groupStoryChatMessage"]>

  export type $GroupStoryChatMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupStoryChatMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      body: string
      author: string | null
      createdAt: Date
    }, ExtArgs["result"]["groupStoryChatMessage"]>
    composites: {}
  }

  type GroupStoryChatMessageGetPayload<S extends boolean | null | undefined | GroupStoryChatMessageDefaultArgs> = $Result.GetResult<Prisma.$GroupStoryChatMessagePayload, S>

  type GroupStoryChatMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupStoryChatMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupStoryChatMessageCountAggregateInputType | true
    }

  export interface GroupStoryChatMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupStoryChatMessage'], meta: { name: 'GroupStoryChatMessage' } }
    /**
     * Find zero or one GroupStoryChatMessage that matches the filter.
     * @param {GroupStoryChatMessageFindUniqueArgs} args - Arguments to find a GroupStoryChatMessage
     * @example
     * // Get one GroupStoryChatMessage
     * const groupStoryChatMessage = await prisma.groupStoryChatMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupStoryChatMessageFindUniqueArgs>(args: SelectSubset<T, GroupStoryChatMessageFindUniqueArgs<ExtArgs>>): Prisma__GroupStoryChatMessageClient<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupStoryChatMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupStoryChatMessageFindUniqueOrThrowArgs} args - Arguments to find a GroupStoryChatMessage
     * @example
     * // Get one GroupStoryChatMessage
     * const groupStoryChatMessage = await prisma.groupStoryChatMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupStoryChatMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupStoryChatMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupStoryChatMessageClient<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupStoryChatMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStoryChatMessageFindFirstArgs} args - Arguments to find a GroupStoryChatMessage
     * @example
     * // Get one GroupStoryChatMessage
     * const groupStoryChatMessage = await prisma.groupStoryChatMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupStoryChatMessageFindFirstArgs>(args?: SelectSubset<T, GroupStoryChatMessageFindFirstArgs<ExtArgs>>): Prisma__GroupStoryChatMessageClient<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupStoryChatMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStoryChatMessageFindFirstOrThrowArgs} args - Arguments to find a GroupStoryChatMessage
     * @example
     * // Get one GroupStoryChatMessage
     * const groupStoryChatMessage = await prisma.groupStoryChatMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupStoryChatMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupStoryChatMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupStoryChatMessageClient<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupStoryChatMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStoryChatMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupStoryChatMessages
     * const groupStoryChatMessages = await prisma.groupStoryChatMessage.findMany()
     * 
     * // Get first 10 GroupStoryChatMessages
     * const groupStoryChatMessages = await prisma.groupStoryChatMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupStoryChatMessageWithIdOnly = await prisma.groupStoryChatMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupStoryChatMessageFindManyArgs>(args?: SelectSubset<T, GroupStoryChatMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupStoryChatMessage.
     * @param {GroupStoryChatMessageCreateArgs} args - Arguments to create a GroupStoryChatMessage.
     * @example
     * // Create one GroupStoryChatMessage
     * const GroupStoryChatMessage = await prisma.groupStoryChatMessage.create({
     *   data: {
     *     // ... data to create a GroupStoryChatMessage
     *   }
     * })
     * 
     */
    create<T extends GroupStoryChatMessageCreateArgs>(args: SelectSubset<T, GroupStoryChatMessageCreateArgs<ExtArgs>>): Prisma__GroupStoryChatMessageClient<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupStoryChatMessages.
     * @param {GroupStoryChatMessageCreateManyArgs} args - Arguments to create many GroupStoryChatMessages.
     * @example
     * // Create many GroupStoryChatMessages
     * const groupStoryChatMessage = await prisma.groupStoryChatMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupStoryChatMessageCreateManyArgs>(args?: SelectSubset<T, GroupStoryChatMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupStoryChatMessages and returns the data saved in the database.
     * @param {GroupStoryChatMessageCreateManyAndReturnArgs} args - Arguments to create many GroupStoryChatMessages.
     * @example
     * // Create many GroupStoryChatMessages
     * const groupStoryChatMessage = await prisma.groupStoryChatMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupStoryChatMessages and only return the `id`
     * const groupStoryChatMessageWithIdOnly = await prisma.groupStoryChatMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupStoryChatMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupStoryChatMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupStoryChatMessage.
     * @param {GroupStoryChatMessageDeleteArgs} args - Arguments to delete one GroupStoryChatMessage.
     * @example
     * // Delete one GroupStoryChatMessage
     * const GroupStoryChatMessage = await prisma.groupStoryChatMessage.delete({
     *   where: {
     *     // ... filter to delete one GroupStoryChatMessage
     *   }
     * })
     * 
     */
    delete<T extends GroupStoryChatMessageDeleteArgs>(args: SelectSubset<T, GroupStoryChatMessageDeleteArgs<ExtArgs>>): Prisma__GroupStoryChatMessageClient<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupStoryChatMessage.
     * @param {GroupStoryChatMessageUpdateArgs} args - Arguments to update one GroupStoryChatMessage.
     * @example
     * // Update one GroupStoryChatMessage
     * const groupStoryChatMessage = await prisma.groupStoryChatMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupStoryChatMessageUpdateArgs>(args: SelectSubset<T, GroupStoryChatMessageUpdateArgs<ExtArgs>>): Prisma__GroupStoryChatMessageClient<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupStoryChatMessages.
     * @param {GroupStoryChatMessageDeleteManyArgs} args - Arguments to filter GroupStoryChatMessages to delete.
     * @example
     * // Delete a few GroupStoryChatMessages
     * const { count } = await prisma.groupStoryChatMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupStoryChatMessageDeleteManyArgs>(args?: SelectSubset<T, GroupStoryChatMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupStoryChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStoryChatMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupStoryChatMessages
     * const groupStoryChatMessage = await prisma.groupStoryChatMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupStoryChatMessageUpdateManyArgs>(args: SelectSubset<T, GroupStoryChatMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupStoryChatMessages and returns the data updated in the database.
     * @param {GroupStoryChatMessageUpdateManyAndReturnArgs} args - Arguments to update many GroupStoryChatMessages.
     * @example
     * // Update many GroupStoryChatMessages
     * const groupStoryChatMessage = await prisma.groupStoryChatMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupStoryChatMessages and only return the `id`
     * const groupStoryChatMessageWithIdOnly = await prisma.groupStoryChatMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupStoryChatMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupStoryChatMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupStoryChatMessage.
     * @param {GroupStoryChatMessageUpsertArgs} args - Arguments to update or create a GroupStoryChatMessage.
     * @example
     * // Update or create a GroupStoryChatMessage
     * const groupStoryChatMessage = await prisma.groupStoryChatMessage.upsert({
     *   create: {
     *     // ... data to create a GroupStoryChatMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupStoryChatMessage we want to update
     *   }
     * })
     */
    upsert<T extends GroupStoryChatMessageUpsertArgs>(args: SelectSubset<T, GroupStoryChatMessageUpsertArgs<ExtArgs>>): Prisma__GroupStoryChatMessageClient<$Result.GetResult<Prisma.$GroupStoryChatMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupStoryChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStoryChatMessageCountArgs} args - Arguments to filter GroupStoryChatMessages to count.
     * @example
     * // Count the number of GroupStoryChatMessages
     * const count = await prisma.groupStoryChatMessage.count({
     *   where: {
     *     // ... the filter for the GroupStoryChatMessages we want to count
     *   }
     * })
    **/
    count<T extends GroupStoryChatMessageCountArgs>(
      args?: Subset<T, GroupStoryChatMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupStoryChatMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupStoryChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStoryChatMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupStoryChatMessageAggregateArgs>(args: Subset<T, GroupStoryChatMessageAggregateArgs>): Prisma.PrismaPromise<GetGroupStoryChatMessageAggregateType<T>>

    /**
     * Group by GroupStoryChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupStoryChatMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupStoryChatMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupStoryChatMessageGroupByArgs['orderBy'] }
        : { orderBy?: GroupStoryChatMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupStoryChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupStoryChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupStoryChatMessage model
   */
  readonly fields: GroupStoryChatMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupStoryChatMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupStoryChatMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupStoryChatMessage model
   */
  interface GroupStoryChatMessageFieldRefs {
    readonly id: FieldRef<"GroupStoryChatMessage", 'String'>
    readonly body: FieldRef<"GroupStoryChatMessage", 'String'>
    readonly author: FieldRef<"GroupStoryChatMessage", 'String'>
    readonly createdAt: FieldRef<"GroupStoryChatMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupStoryChatMessage findUnique
   */
  export type GroupStoryChatMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which GroupStoryChatMessage to fetch.
     */
    where: GroupStoryChatMessageWhereUniqueInput
  }

  /**
   * GroupStoryChatMessage findUniqueOrThrow
   */
  export type GroupStoryChatMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which GroupStoryChatMessage to fetch.
     */
    where: GroupStoryChatMessageWhereUniqueInput
  }

  /**
   * GroupStoryChatMessage findFirst
   */
  export type GroupStoryChatMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which GroupStoryChatMessage to fetch.
     */
    where?: GroupStoryChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupStoryChatMessages to fetch.
     */
    orderBy?: GroupStoryChatMessageOrderByWithRelationInput | GroupStoryChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupStoryChatMessages.
     */
    cursor?: GroupStoryChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupStoryChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupStoryChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupStoryChatMessages.
     */
    distinct?: GroupStoryChatMessageScalarFieldEnum | GroupStoryChatMessageScalarFieldEnum[]
  }

  /**
   * GroupStoryChatMessage findFirstOrThrow
   */
  export type GroupStoryChatMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which GroupStoryChatMessage to fetch.
     */
    where?: GroupStoryChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupStoryChatMessages to fetch.
     */
    orderBy?: GroupStoryChatMessageOrderByWithRelationInput | GroupStoryChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupStoryChatMessages.
     */
    cursor?: GroupStoryChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupStoryChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupStoryChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupStoryChatMessages.
     */
    distinct?: GroupStoryChatMessageScalarFieldEnum | GroupStoryChatMessageScalarFieldEnum[]
  }

  /**
   * GroupStoryChatMessage findMany
   */
  export type GroupStoryChatMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which GroupStoryChatMessages to fetch.
     */
    where?: GroupStoryChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupStoryChatMessages to fetch.
     */
    orderBy?: GroupStoryChatMessageOrderByWithRelationInput | GroupStoryChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupStoryChatMessages.
     */
    cursor?: GroupStoryChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupStoryChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupStoryChatMessages.
     */
    skip?: number
    distinct?: GroupStoryChatMessageScalarFieldEnum | GroupStoryChatMessageScalarFieldEnum[]
  }

  /**
   * GroupStoryChatMessage create
   */
  export type GroupStoryChatMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a GroupStoryChatMessage.
     */
    data: XOR<GroupStoryChatMessageCreateInput, GroupStoryChatMessageUncheckedCreateInput>
  }

  /**
   * GroupStoryChatMessage createMany
   */
  export type GroupStoryChatMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupStoryChatMessages.
     */
    data: GroupStoryChatMessageCreateManyInput | GroupStoryChatMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupStoryChatMessage createManyAndReturn
   */
  export type GroupStoryChatMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * The data used to create many GroupStoryChatMessages.
     */
    data: GroupStoryChatMessageCreateManyInput | GroupStoryChatMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupStoryChatMessage update
   */
  export type GroupStoryChatMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a GroupStoryChatMessage.
     */
    data: XOR<GroupStoryChatMessageUpdateInput, GroupStoryChatMessageUncheckedUpdateInput>
    /**
     * Choose, which GroupStoryChatMessage to update.
     */
    where: GroupStoryChatMessageWhereUniqueInput
  }

  /**
   * GroupStoryChatMessage updateMany
   */
  export type GroupStoryChatMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupStoryChatMessages.
     */
    data: XOR<GroupStoryChatMessageUpdateManyMutationInput, GroupStoryChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which GroupStoryChatMessages to update
     */
    where?: GroupStoryChatMessageWhereInput
    /**
     * Limit how many GroupStoryChatMessages to update.
     */
    limit?: number
  }

  /**
   * GroupStoryChatMessage updateManyAndReturn
   */
  export type GroupStoryChatMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * The data used to update GroupStoryChatMessages.
     */
    data: XOR<GroupStoryChatMessageUpdateManyMutationInput, GroupStoryChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which GroupStoryChatMessages to update
     */
    where?: GroupStoryChatMessageWhereInput
    /**
     * Limit how many GroupStoryChatMessages to update.
     */
    limit?: number
  }

  /**
   * GroupStoryChatMessage upsert
   */
  export type GroupStoryChatMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the GroupStoryChatMessage to update in case it exists.
     */
    where: GroupStoryChatMessageWhereUniqueInput
    /**
     * In case the GroupStoryChatMessage found by the `where` argument doesn't exist, create a new GroupStoryChatMessage with this data.
     */
    create: XOR<GroupStoryChatMessageCreateInput, GroupStoryChatMessageUncheckedCreateInput>
    /**
     * In case the GroupStoryChatMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupStoryChatMessageUpdateInput, GroupStoryChatMessageUncheckedUpdateInput>
  }

  /**
   * GroupStoryChatMessage delete
   */
  export type GroupStoryChatMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
    /**
     * Filter which GroupStoryChatMessage to delete.
     */
    where: GroupStoryChatMessageWhereUniqueInput
  }

  /**
   * GroupStoryChatMessage deleteMany
   */
  export type GroupStoryChatMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupStoryChatMessages to delete
     */
    where?: GroupStoryChatMessageWhereInput
    /**
     * Limit how many GroupStoryChatMessages to delete.
     */
    limit?: number
  }

  /**
   * GroupStoryChatMessage without action
   */
  export type GroupStoryChatMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupStoryChatMessage
     */
    select?: GroupStoryChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupStoryChatMessage
     */
    omit?: GroupStoryChatMessageOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PostScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const PraiseSubmissionScalarFieldEnum: {
    id: 'id',
    kind: 'kind',
    message: 'message',
    fromName: 'fromName',
    mediaData: 'mediaData',
    createdAt: 'createdAt'
  };

  export type PraiseSubmissionScalarFieldEnum = (typeof PraiseSubmissionScalarFieldEnum)[keyof typeof PraiseSubmissionScalarFieldEnum]


  export const GardenTipScalarFieldEnum: {
    id: 'id',
    body: 'body',
    fromName: 'fromName',
    stamp: 'stamp',
    backglow: 'backglow',
    createdAt: 'createdAt'
  };

  export type GardenTipScalarFieldEnum = (typeof GardenTipScalarFieldEnum)[keyof typeof GardenTipScalarFieldEnum]


  export const OathTakingScalarFieldEnum: {
    id: 'id',
    oathId: 'oathId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type OathTakingScalarFieldEnum = (typeof OathTakingScalarFieldEnum)[keyof typeof OathTakingScalarFieldEnum]


  export const GroupStorySentenceScalarFieldEnum: {
    id: 'id',
    text: 'text',
    author: 'author',
    createdAt: 'createdAt'
  };

  export type GroupStorySentenceScalarFieldEnum = (typeof GroupStorySentenceScalarFieldEnum)[keyof typeof GroupStorySentenceScalarFieldEnum]


  export const GroupStoryChatMessageScalarFieldEnum: {
    id: 'id',
    body: 'body',
    author: 'author',
    createdAt: 'createdAt'
  };

  export type GroupStoryChatMessageScalarFieldEnum = (typeof GroupStoryChatMessageScalarFieldEnum)[keyof typeof GroupStoryChatMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'PraiseKind'
   */
  export type EnumPraiseKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PraiseKind'>
    


  /**
   * Reference to a field of type 'PraiseKind[]'
   */
  export type ListEnumPraiseKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PraiseKind[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: IntFilter<"Post"> | number
    name?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    name?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Post"> | number
    name?: StringWithAggregatesFilter<"Post"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
  }

  export type PraiseSubmissionWhereInput = {
    AND?: PraiseSubmissionWhereInput | PraiseSubmissionWhereInput[]
    OR?: PraiseSubmissionWhereInput[]
    NOT?: PraiseSubmissionWhereInput | PraiseSubmissionWhereInput[]
    id?: StringFilter<"PraiseSubmission"> | string
    kind?: EnumPraiseKindFilter<"PraiseSubmission"> | $Enums.PraiseKind
    message?: StringNullableFilter<"PraiseSubmission"> | string | null
    fromName?: StringNullableFilter<"PraiseSubmission"> | string | null
    mediaData?: StringNullableFilter<"PraiseSubmission"> | string | null
    createdAt?: DateTimeFilter<"PraiseSubmission"> | Date | string
  }

  export type PraiseSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    kind?: SortOrder
    message?: SortOrderInput | SortOrder
    fromName?: SortOrderInput | SortOrder
    mediaData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type PraiseSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PraiseSubmissionWhereInput | PraiseSubmissionWhereInput[]
    OR?: PraiseSubmissionWhereInput[]
    NOT?: PraiseSubmissionWhereInput | PraiseSubmissionWhereInput[]
    kind?: EnumPraiseKindFilter<"PraiseSubmission"> | $Enums.PraiseKind
    message?: StringNullableFilter<"PraiseSubmission"> | string | null
    fromName?: StringNullableFilter<"PraiseSubmission"> | string | null
    mediaData?: StringNullableFilter<"PraiseSubmission"> | string | null
    createdAt?: DateTimeFilter<"PraiseSubmission"> | Date | string
  }, "id">

  export type PraiseSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    kind?: SortOrder
    message?: SortOrderInput | SortOrder
    fromName?: SortOrderInput | SortOrder
    mediaData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PraiseSubmissionCountOrderByAggregateInput
    _max?: PraiseSubmissionMaxOrderByAggregateInput
    _min?: PraiseSubmissionMinOrderByAggregateInput
  }

  export type PraiseSubmissionScalarWhereWithAggregatesInput = {
    AND?: PraiseSubmissionScalarWhereWithAggregatesInput | PraiseSubmissionScalarWhereWithAggregatesInput[]
    OR?: PraiseSubmissionScalarWhereWithAggregatesInput[]
    NOT?: PraiseSubmissionScalarWhereWithAggregatesInput | PraiseSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PraiseSubmission"> | string
    kind?: EnumPraiseKindWithAggregatesFilter<"PraiseSubmission"> | $Enums.PraiseKind
    message?: StringNullableWithAggregatesFilter<"PraiseSubmission"> | string | null
    fromName?: StringNullableWithAggregatesFilter<"PraiseSubmission"> | string | null
    mediaData?: StringNullableWithAggregatesFilter<"PraiseSubmission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PraiseSubmission"> | Date | string
  }

  export type GardenTipWhereInput = {
    AND?: GardenTipWhereInput | GardenTipWhereInput[]
    OR?: GardenTipWhereInput[]
    NOT?: GardenTipWhereInput | GardenTipWhereInput[]
    id?: StringFilter<"GardenTip"> | string
    body?: StringFilter<"GardenTip"> | string
    fromName?: StringNullableFilter<"GardenTip"> | string | null
    stamp?: IntFilter<"GardenTip"> | number
    backglow?: BoolFilter<"GardenTip"> | boolean
    createdAt?: DateTimeFilter<"GardenTip"> | Date | string
  }

  export type GardenTipOrderByWithRelationInput = {
    id?: SortOrder
    body?: SortOrder
    fromName?: SortOrderInput | SortOrder
    stamp?: SortOrder
    backglow?: SortOrder
    createdAt?: SortOrder
  }

  export type GardenTipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GardenTipWhereInput | GardenTipWhereInput[]
    OR?: GardenTipWhereInput[]
    NOT?: GardenTipWhereInput | GardenTipWhereInput[]
    body?: StringFilter<"GardenTip"> | string
    fromName?: StringNullableFilter<"GardenTip"> | string | null
    stamp?: IntFilter<"GardenTip"> | number
    backglow?: BoolFilter<"GardenTip"> | boolean
    createdAt?: DateTimeFilter<"GardenTip"> | Date | string
  }, "id">

  export type GardenTipOrderByWithAggregationInput = {
    id?: SortOrder
    body?: SortOrder
    fromName?: SortOrderInput | SortOrder
    stamp?: SortOrder
    backglow?: SortOrder
    createdAt?: SortOrder
    _count?: GardenTipCountOrderByAggregateInput
    _avg?: GardenTipAvgOrderByAggregateInput
    _max?: GardenTipMaxOrderByAggregateInput
    _min?: GardenTipMinOrderByAggregateInput
    _sum?: GardenTipSumOrderByAggregateInput
  }

  export type GardenTipScalarWhereWithAggregatesInput = {
    AND?: GardenTipScalarWhereWithAggregatesInput | GardenTipScalarWhereWithAggregatesInput[]
    OR?: GardenTipScalarWhereWithAggregatesInput[]
    NOT?: GardenTipScalarWhereWithAggregatesInput | GardenTipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GardenTip"> | string
    body?: StringWithAggregatesFilter<"GardenTip"> | string
    fromName?: StringNullableWithAggregatesFilter<"GardenTip"> | string | null
    stamp?: IntWithAggregatesFilter<"GardenTip"> | number
    backglow?: BoolWithAggregatesFilter<"GardenTip"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"GardenTip"> | Date | string
  }

  export type OathTakingWhereInput = {
    AND?: OathTakingWhereInput | OathTakingWhereInput[]
    OR?: OathTakingWhereInput[]
    NOT?: OathTakingWhereInput | OathTakingWhereInput[]
    id?: StringFilter<"OathTaking"> | string
    oathId?: StringFilter<"OathTaking"> | string
    name?: StringFilter<"OathTaking"> | string
    createdAt?: DateTimeFilter<"OathTaking"> | Date | string
  }

  export type OathTakingOrderByWithRelationInput = {
    id?: SortOrder
    oathId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type OathTakingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OathTakingWhereInput | OathTakingWhereInput[]
    OR?: OathTakingWhereInput[]
    NOT?: OathTakingWhereInput | OathTakingWhereInput[]
    oathId?: StringFilter<"OathTaking"> | string
    name?: StringFilter<"OathTaking"> | string
    createdAt?: DateTimeFilter<"OathTaking"> | Date | string
  }, "id">

  export type OathTakingOrderByWithAggregationInput = {
    id?: SortOrder
    oathId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: OathTakingCountOrderByAggregateInput
    _max?: OathTakingMaxOrderByAggregateInput
    _min?: OathTakingMinOrderByAggregateInput
  }

  export type OathTakingScalarWhereWithAggregatesInput = {
    AND?: OathTakingScalarWhereWithAggregatesInput | OathTakingScalarWhereWithAggregatesInput[]
    OR?: OathTakingScalarWhereWithAggregatesInput[]
    NOT?: OathTakingScalarWhereWithAggregatesInput | OathTakingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OathTaking"> | string
    oathId?: StringWithAggregatesFilter<"OathTaking"> | string
    name?: StringWithAggregatesFilter<"OathTaking"> | string
    createdAt?: DateTimeWithAggregatesFilter<"OathTaking"> | Date | string
  }

  export type GroupStorySentenceWhereInput = {
    AND?: GroupStorySentenceWhereInput | GroupStorySentenceWhereInput[]
    OR?: GroupStorySentenceWhereInput[]
    NOT?: GroupStorySentenceWhereInput | GroupStorySentenceWhereInput[]
    id?: StringFilter<"GroupStorySentence"> | string
    text?: StringFilter<"GroupStorySentence"> | string
    author?: StringFilter<"GroupStorySentence"> | string
    createdAt?: DateTimeFilter<"GroupStorySentence"> | Date | string
  }

  export type GroupStorySentenceOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupStorySentenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupStorySentenceWhereInput | GroupStorySentenceWhereInput[]
    OR?: GroupStorySentenceWhereInput[]
    NOT?: GroupStorySentenceWhereInput | GroupStorySentenceWhereInput[]
    text?: StringFilter<"GroupStorySentence"> | string
    author?: StringFilter<"GroupStorySentence"> | string
    createdAt?: DateTimeFilter<"GroupStorySentence"> | Date | string
  }, "id">

  export type GroupStorySentenceOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
    _count?: GroupStorySentenceCountOrderByAggregateInput
    _max?: GroupStorySentenceMaxOrderByAggregateInput
    _min?: GroupStorySentenceMinOrderByAggregateInput
  }

  export type GroupStorySentenceScalarWhereWithAggregatesInput = {
    AND?: GroupStorySentenceScalarWhereWithAggregatesInput | GroupStorySentenceScalarWhereWithAggregatesInput[]
    OR?: GroupStorySentenceScalarWhereWithAggregatesInput[]
    NOT?: GroupStorySentenceScalarWhereWithAggregatesInput | GroupStorySentenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupStorySentence"> | string
    text?: StringWithAggregatesFilter<"GroupStorySentence"> | string
    author?: StringWithAggregatesFilter<"GroupStorySentence"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GroupStorySentence"> | Date | string
  }

  export type GroupStoryChatMessageWhereInput = {
    AND?: GroupStoryChatMessageWhereInput | GroupStoryChatMessageWhereInput[]
    OR?: GroupStoryChatMessageWhereInput[]
    NOT?: GroupStoryChatMessageWhereInput | GroupStoryChatMessageWhereInput[]
    id?: StringFilter<"GroupStoryChatMessage"> | string
    body?: StringFilter<"GroupStoryChatMessage"> | string
    author?: StringNullableFilter<"GroupStoryChatMessage"> | string | null
    createdAt?: DateTimeFilter<"GroupStoryChatMessage"> | Date | string
  }

  export type GroupStoryChatMessageOrderByWithRelationInput = {
    id?: SortOrder
    body?: SortOrder
    author?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type GroupStoryChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupStoryChatMessageWhereInput | GroupStoryChatMessageWhereInput[]
    OR?: GroupStoryChatMessageWhereInput[]
    NOT?: GroupStoryChatMessageWhereInput | GroupStoryChatMessageWhereInput[]
    body?: StringFilter<"GroupStoryChatMessage"> | string
    author?: StringNullableFilter<"GroupStoryChatMessage"> | string | null
    createdAt?: DateTimeFilter<"GroupStoryChatMessage"> | Date | string
  }, "id">

  export type GroupStoryChatMessageOrderByWithAggregationInput = {
    id?: SortOrder
    body?: SortOrder
    author?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: GroupStoryChatMessageCountOrderByAggregateInput
    _max?: GroupStoryChatMessageMaxOrderByAggregateInput
    _min?: GroupStoryChatMessageMinOrderByAggregateInput
  }

  export type GroupStoryChatMessageScalarWhereWithAggregatesInput = {
    AND?: GroupStoryChatMessageScalarWhereWithAggregatesInput | GroupStoryChatMessageScalarWhereWithAggregatesInput[]
    OR?: GroupStoryChatMessageScalarWhereWithAggregatesInput[]
    NOT?: GroupStoryChatMessageScalarWhereWithAggregatesInput | GroupStoryChatMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupStoryChatMessage"> | string
    body?: StringWithAggregatesFilter<"GroupStoryChatMessage"> | string
    author?: StringNullableWithAggregatesFilter<"GroupStoryChatMessage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GroupStoryChatMessage"> | Date | string
  }

  export type PostCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PraiseSubmissionCreateInput = {
    id?: string
    kind: $Enums.PraiseKind
    message?: string | null
    fromName?: string | null
    mediaData?: string | null
    createdAt?: Date | string
  }

  export type PraiseSubmissionUncheckedCreateInput = {
    id?: string
    kind: $Enums.PraiseKind
    message?: string | null
    fromName?: string | null
    mediaData?: string | null
    createdAt?: Date | string
  }

  export type PraiseSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumPraiseKindFieldUpdateOperationsInput | $Enums.PraiseKind
    message?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: NullableStringFieldUpdateOperationsInput | string | null
    mediaData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PraiseSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumPraiseKindFieldUpdateOperationsInput | $Enums.PraiseKind
    message?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: NullableStringFieldUpdateOperationsInput | string | null
    mediaData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PraiseSubmissionCreateManyInput = {
    id?: string
    kind: $Enums.PraiseKind
    message?: string | null
    fromName?: string | null
    mediaData?: string | null
    createdAt?: Date | string
  }

  export type PraiseSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumPraiseKindFieldUpdateOperationsInput | $Enums.PraiseKind
    message?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: NullableStringFieldUpdateOperationsInput | string | null
    mediaData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PraiseSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumPraiseKindFieldUpdateOperationsInput | $Enums.PraiseKind
    message?: NullableStringFieldUpdateOperationsInput | string | null
    fromName?: NullableStringFieldUpdateOperationsInput | string | null
    mediaData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GardenTipCreateInput = {
    id?: string
    body: string
    fromName?: string | null
    stamp?: number
    backglow?: boolean
    createdAt?: Date | string
  }

  export type GardenTipUncheckedCreateInput = {
    id?: string
    body: string
    fromName?: string | null
    stamp?: number
    backglow?: boolean
    createdAt?: Date | string
  }

  export type GardenTipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    fromName?: NullableStringFieldUpdateOperationsInput | string | null
    stamp?: IntFieldUpdateOperationsInput | number
    backglow?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GardenTipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    fromName?: NullableStringFieldUpdateOperationsInput | string | null
    stamp?: IntFieldUpdateOperationsInput | number
    backglow?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GardenTipCreateManyInput = {
    id?: string
    body: string
    fromName?: string | null
    stamp?: number
    backglow?: boolean
    createdAt?: Date | string
  }

  export type GardenTipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    fromName?: NullableStringFieldUpdateOperationsInput | string | null
    stamp?: IntFieldUpdateOperationsInput | number
    backglow?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GardenTipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    fromName?: NullableStringFieldUpdateOperationsInput | string | null
    stamp?: IntFieldUpdateOperationsInput | number
    backglow?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OathTakingCreateInput = {
    id?: string
    oathId: string
    name: string
    createdAt?: Date | string
  }

  export type OathTakingUncheckedCreateInput = {
    id?: string
    oathId: string
    name: string
    createdAt?: Date | string
  }

  export type OathTakingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    oathId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OathTakingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    oathId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OathTakingCreateManyInput = {
    id?: string
    oathId: string
    name: string
    createdAt?: Date | string
  }

  export type OathTakingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    oathId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OathTakingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    oathId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupStorySentenceCreateInput = {
    id?: string
    text: string
    author: string
    createdAt?: Date | string
  }

  export type GroupStorySentenceUncheckedCreateInput = {
    id?: string
    text: string
    author: string
    createdAt?: Date | string
  }

  export type GroupStorySentenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupStorySentenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupStorySentenceCreateManyInput = {
    id?: string
    text: string
    author: string
    createdAt?: Date | string
  }

  export type GroupStorySentenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupStorySentenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupStoryChatMessageCreateInput = {
    id?: string
    body: string
    author?: string | null
    createdAt?: Date | string
  }

  export type GroupStoryChatMessageUncheckedCreateInput = {
    id?: string
    body: string
    author?: string | null
    createdAt?: Date | string
  }

  export type GroupStoryChatMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupStoryChatMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupStoryChatMessageCreateManyInput = {
    id?: string
    body: string
    author?: string | null
    createdAt?: Date | string
  }

  export type GroupStoryChatMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupStoryChatMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumPraiseKindFilter<$PrismaModel = never> = {
    equals?: $Enums.PraiseKind | EnumPraiseKindFieldRefInput<$PrismaModel>
    in?: $Enums.PraiseKind[] | ListEnumPraiseKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.PraiseKind[] | ListEnumPraiseKindFieldRefInput<$PrismaModel>
    not?: NestedEnumPraiseKindFilter<$PrismaModel> | $Enums.PraiseKind
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PraiseSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    message?: SortOrder
    fromName?: SortOrder
    mediaData?: SortOrder
    createdAt?: SortOrder
  }

  export type PraiseSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    message?: SortOrder
    fromName?: SortOrder
    mediaData?: SortOrder
    createdAt?: SortOrder
  }

  export type PraiseSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    message?: SortOrder
    fromName?: SortOrder
    mediaData?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumPraiseKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PraiseKind | EnumPraiseKindFieldRefInput<$PrismaModel>
    in?: $Enums.PraiseKind[] | ListEnumPraiseKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.PraiseKind[] | ListEnumPraiseKindFieldRefInput<$PrismaModel>
    not?: NestedEnumPraiseKindWithAggregatesFilter<$PrismaModel> | $Enums.PraiseKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPraiseKindFilter<$PrismaModel>
    _max?: NestedEnumPraiseKindFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type GardenTipCountOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    fromName?: SortOrder
    stamp?: SortOrder
    backglow?: SortOrder
    createdAt?: SortOrder
  }

  export type GardenTipAvgOrderByAggregateInput = {
    stamp?: SortOrder
  }

  export type GardenTipMaxOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    fromName?: SortOrder
    stamp?: SortOrder
    backglow?: SortOrder
    createdAt?: SortOrder
  }

  export type GardenTipMinOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    fromName?: SortOrder
    stamp?: SortOrder
    backglow?: SortOrder
    createdAt?: SortOrder
  }

  export type GardenTipSumOrderByAggregateInput = {
    stamp?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type OathTakingCountOrderByAggregateInput = {
    id?: SortOrder
    oathId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type OathTakingMaxOrderByAggregateInput = {
    id?: SortOrder
    oathId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type OathTakingMinOrderByAggregateInput = {
    id?: SortOrder
    oathId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupStorySentenceCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupStorySentenceMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupStorySentenceMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupStoryChatMessageCountOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupStoryChatMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupStoryChatMessageMinOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPraiseKindFieldUpdateOperationsInput = {
    set?: $Enums.PraiseKind
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumPraiseKindFilter<$PrismaModel = never> = {
    equals?: $Enums.PraiseKind | EnumPraiseKindFieldRefInput<$PrismaModel>
    in?: $Enums.PraiseKind[] | ListEnumPraiseKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.PraiseKind[] | ListEnumPraiseKindFieldRefInput<$PrismaModel>
    not?: NestedEnumPraiseKindFilter<$PrismaModel> | $Enums.PraiseKind
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPraiseKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PraiseKind | EnumPraiseKindFieldRefInput<$PrismaModel>
    in?: $Enums.PraiseKind[] | ListEnumPraiseKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.PraiseKind[] | ListEnumPraiseKindFieldRefInput<$PrismaModel>
    not?: NestedEnumPraiseKindWithAggregatesFilter<$PrismaModel> | $Enums.PraiseKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPraiseKindFilter<$PrismaModel>
    _max?: NestedEnumPraiseKindFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}